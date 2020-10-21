
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import path from "path";
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import Middlewares from './api/middlewares';
import Authentication from './api/authentication';
import TodoRouter from './todo/router';

if (!process.env.JWT_SECRET) {
    const err = new Error('No JWT_SECRET in env variable, check instructions: put token at ennvironement');
    console.error(err);
}

const app = express();

mongoose.connect(config.mongoose.uri, { useMongoClient: true })
    .catch(err => console.error(err));

mongoose.Promise = global.Promise;

const swaggerUi = require('swagger-ui-express');
const { swaggerDocument } = require('./swagger/config');

// App Setup
app.use(cors({
    origin: ['http://localhost:3000']
}));

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.get('/api/ping', (req, res) => res.send('pong'))
app.post('/api/signup', Authentication.signup)
app.post('/api/signin', Authentication.signin)
app.get('/api/auth-ping', Middlewares.loginRequired, (req, res) => res.send('connected'))
app.use('/api/todo', Middlewares.loginRequired, TodoRouter)

app.use((err, req, res, next) => {
    console.log('Error:', err.message);
    res.status(422).json(err.message);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Server Setup
const port = process.env.PORT || 8000
http.createServer(app).listen(port, () => {
    console.log(`\x1b[32m`, `Server listening on: ${port}`, `\x1b[0m`)
});
