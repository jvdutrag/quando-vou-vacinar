const { Schedule, Sequelize } = require('../models');

class DaoSchedule {
    constructor() { }

    async find(age, state) {
        return Schedule.findOne({
            where: {
                state,
                from_age: {
                    [Sequelize.Op.lte]: age
                },
                to_age: {
                    [Sequelize.Op.gte]: age
                }
            },
            attributes: {
                exclude: ['id', 'state']
            }
        });
    }

    async createMultiple(array) {
        return Schedule.bulkCreate(array);
    }
}

module.exports = new DaoSchedule();