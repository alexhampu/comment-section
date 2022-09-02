require('dotenv').config();

const cors = require('cors');
const express = require('express');
const { Server } = require("socket.io");
const apiRoutes = require('./src/routes/api');
const {PORT = 4201, APP_HOSTNAME = 'localhost'} = process.env;
const URL = `http://${APP_HOSTNAME}:${PORT}`;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', apiRoutes);

const io = new Server({
    cors: {
        origin: "*"
    }
});

const server = app.listen(PORT, () => {
    console.log(`Server is online, visit at: ${URL}`);
});

io.listen(server);

app.set('io', io);