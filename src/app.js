const express = require('express');
const routes = require('./routes');

const app = express();

app.use(require('cors')());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_, res) => {
    return res.send({
        name: 'Quando Vou Vacinar API',
        version: 1.0
    });
});

app.use(routes);

module.exports = app;