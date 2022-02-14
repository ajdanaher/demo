'use strict'

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

const app = express();
const config = require('./serverDefination.json');

import HealthRoutes from './src/routes/HealthRoutes';
import ApplicationRoutes from './src/routes/ApplicationRoutes';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/v1/ping', HealthRoutes);
app.use('/v1', ApplicationRoutes);


const server = http.createServer(app);
server.listen(config.port, () => {
  console.log(`HTTP Server Started at port ${config.port}`)
})

