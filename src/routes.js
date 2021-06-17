const express = require('express');
const moment = require('moment');
const statesList = require('brazilian-states');

const router = express.Router();

const DaoSchedule = require('./daos/DaoSchedule');
const DaoSource = require('./daos/DaoSource');

router.post('/api/states', async (req, res) => {
    if(req.get('Authorization') !== process.env.SECRET_KEY) {
        return res.sendStatus(401);
    }

    const { state_code, source_url, schedulesInfo } = req.body;

    if(!state_code || !source_url || !schedulesInfo) {
        return res.status(400).send({ success: false, message: 'Missing Required Data' });
    }

    const stateExists = await DaoSource.find(state_code);

    if(stateExists) {
        return res.status(400).send({ success: false, message: 'State Already Exists' });
    }

    const source = await DaoSource.create({
        state: state_code,
        url: source_url
    });

    const schedulesToInsert = new Array();

    schedulesInfo.forEach(schedule => {
        schedulesToInsert.push({
            state: state_code,
            from_age: schedule.ages[0],
            to_age: schedule.ages[1],
            starts_at: schedule.starts_at,
            ends_at: schedule.ends_at
        });
    });

    const schedules = await DaoSchedule.createMultiple(schedulesToInsert);

    return res.send({
        source,
        schedules
    });
});

router.get('/api/states', async (req, res) => {
    const states = await DaoSource.findAll();

    const result = states.map(e => {
        const code = e.state;

        return {
            code,
            name: statesList.get(code).name
        }
    });

    return res.send(result);
});

router.post('/api/schedule', async (req, res) => {
    const info = req.body;

    if(!info.dob || !info.state) {
        return res.status(400).send({ success: false, code: 'MISSING_DATA', message: 'Missing Required Data', type: 'error' });
    }

    const state = statesList.get(info.state);

    if(!state) {
        return res.status(400).send({ success: false, code: 'INVALID_STATE', message: 'Invalid State', type: 'error' });
    }

    const age = moment().diff(info.dob, 'years');

    if(age >= 60) {
        return res.status(400).send({ success: false, code: 'ALREADY_VACCINATED', message: 'Already Vaccinated', type: 'warning' });
    }

    if(age < 18) {
        return res.status(400).send({ success: false, code: 'NOT_APPLICABLE_TO_VACCINATION', message: 'Underage of 18', type: 'warning' });
    }

    const schedule = await DaoSchedule.find(age, info.state);

    if(!schedule) {
        return res.status(400).send({ success: false, code: 'SCHEDULE_NOT_FOUND', message: 'Schedule not found: invalid state or age', type: 'warning' });
    }

    const source = await DaoSource.find(info.state);

    const result = {
        success: true,
        state: {
            code: state.code,
            name: state.name
        },
        schedule: {
            ...schedule.get(),
            source_url: source.url,
            is_current: moment().isBetween(moment(schedule.starts_at), moment(schedule.ends_at))
        }
    }

    return res.send(result);
});

module.exports = router;