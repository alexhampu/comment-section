require('dotenv').config();

const cors = require('cors');
const express = require('express');
const { Server } = require("socket.io");
const apiRoutes = require('./src/routes/api');
const {WS_PORT = 4200, APP_PORT = 4201, APP_HOSTNAME = 'localhost'} = process.env;
const URL = `http://${APP_HOSTNAME}:${APP_PORT}`;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', apiRoutes);

const io = new Server({
    cors: {
        origin: "*"
    }
});

io.listen(WS_PORT);

app.set('io', io);

app.listen(APP_PORT, () => {
    console.log(`Server is online, visit at: ${URL}`);
});