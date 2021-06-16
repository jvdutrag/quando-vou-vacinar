require('dotenv').config();

const db = require('./models');
const app = require('./app');

db.sequelize.sync({ alter: true }).then(() => {
    console.log('[ON] Database connected & synced');

    app.listen(process.env.PORT, () => {
        console.log('[ON] Server working on port', process.env.PORT);
    });
});