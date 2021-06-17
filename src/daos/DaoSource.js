const { Source } = require('../models');

class DaoSource {
    constructor() { }

    async find(state) {
        return Source.findOne({
            where: {
                state
            }
        });
    }

    async findAll() {
        return Source.findAll({
            attributes: ['state']
        });
    }

    async create(obj) {
        return Source.create(obj);
    }
}

module.exports = new DaoSource();