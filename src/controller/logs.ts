import {Request, Response} from 'express';
import { EventEmitter } from 'events';
import {eventEmitter} from '../server'

const pino = require("pino");

const logger = pino({
    transport: {
        target: 'pino-pretty'
    },
})

// const eventEmitter = new EventEmitter();

//todo: add swagger
const createLog: any = async (req: Request, res: Response) => {
    if (!req.body) return res.sendStatus(400);


    const logMessage: String = req.body.logMessage;
    eventEmitter.emit('myEvent', logMessage);

    logger.error(logMessage);
    res.send(logMessage);
};

export default { createLog, eventEmitter };

