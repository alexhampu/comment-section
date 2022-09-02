require('dotenv').config();

const express = require('express');
const apiRoutes = require('./src/routes/api');
const {APP_PORT = 4201, APP_HOSTNAME = 'localhost'} = process.env;
const URL = `http://${APP_HOSTNAME}:${APP_PORT}`;
const app = express();

app.listen(APP_PORT, () => {
    console.log(`Server is online, visit at: ${URL}`);
});

app.use('/api', apiRoutes);