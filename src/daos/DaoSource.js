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
}

module.exports = new DaoSource();