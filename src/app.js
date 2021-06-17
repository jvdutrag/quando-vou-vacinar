const express = require('express');
const path = require('path');

const routes = require('./routes');

const app = express();

app.use(require('cors')());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.use(express.static(path.join(__dirname, '..', 'client/build')));

app.get('*', function(request, response) {
    return response.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'));
});

app.use((error, req, res, next) => {
    console.log(error.toString());

    return res.status(500).send('Um erro ocorreu - Em manutenção');
});

module.exports = app;