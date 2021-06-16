const express = require('express');
const moment = require('moment');
const states = require('brazilian-states');

const router = express.Router();

const DaoSchedule = require('./daos/DaoSchedule');
const DaoSource = require('./daos/DaoSource');

router.post('/schedule', async (req, res) => {
    const info = req.body;

    if(!info.dob || !info.state) {
        return res.status(400).send({ error: true, code: 'MISSING_DATA', message: 'Missing Required Data' });
    }

    const state = states.get(info.state);

    if(!state) {
        return res.status(400).send({ error: true, code: 'INVALID_STATE', message: 'Invalid State' });
    }

    const age = moment().diff(info.dob, 'years');

    if(age >= 60) {
        return res.status(400).send({ error: true, code: 'ALREADY_VACCINATED', message: 'Already Vaccinated' });
    }

    if(age < 18) {
        return res.status(400).send({ error: true, code: 'NOT_APPLICABLE_TO_VACCINATION', message: 'Underage of 18' });
    }

    const schedule = await DaoSchedule.find(age, info.state);

    if(!schedule) {
        return res.status(400).send({ error: true, code: 'SCHEDULE_NOT_FOUND', message: 'Schedule not found: invalid state or age' });
    }

    const source = await DaoSource.find(info.state);

    const result = {
        state: {
            code: state.code,
            name: state.name
        },
        schedule: {
            ...schedule.get(),
            source_url: source.url
        }
    }

    return res.send(result);
});

module.exports = router;