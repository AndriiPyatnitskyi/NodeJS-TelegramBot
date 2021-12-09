// Run DB - docker run --name TelegramBotDemoDB -d -it -p 27017:27017 mongo:4.4.10-rc0-focal


import http from 'http';
import express, {Express} from 'express';
import morgan from 'morgan';

import accountRouter from './routes/accounts';
import tokenRouter from './routes/tokens';
import telegramBotRouter from './routes/telegramBots';
import logRouter from "./routes/logs";

import swaggerUi from 'swagger-ui-express';
const mongoose = require("mongoose");
import botInit from './eventListener/telegramBot';
import {EventEmitter} from "events";
const eventEmitter = new EventEmitter();


const swaggerDocument = require('./swagger.json');
const app: Express = express();

/** Init DB */

const Schema = mongoose.Schema;

const userScheme = new Schema({
    name: String,
    token: String,
    role: String
});

mongoose.connect("mongodb://localhost:27017/usersdb", { useUnifiedTopology: true, useNewUrlParser: true });

const Account = mongoose.model("Account", userScheme);

/** Swagger */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/** Logging */
app.use(morgan('dev'));
/** Parse the request */
app.use(express.urlencoded({extended: false}));
/** Takes care of JSON data */
app.use(express.json());

/** RULES OF OUR API */
app.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
app.use('/', accountRouter);
app.use('/', tokenRouter);
app.use('/', telegramBotRouter);
app.use('/', logRouter);

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Register EventListeners */
botInit(eventEmitter);

/** Server */
const httpServer = http.createServer(app);
const PORT: any = process.env.PORT ?? 6062;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

export { eventEmitter, Account}
