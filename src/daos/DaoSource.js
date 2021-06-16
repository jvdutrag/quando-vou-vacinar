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
}

module.exports = new DaoSource();