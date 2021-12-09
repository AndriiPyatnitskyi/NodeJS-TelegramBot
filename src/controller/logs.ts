import {Request, Response} from 'express';
import {eventEmitter} from '../server'
import {LogLevel} from "../enum/logLevel";

const pino = require("pino");

const logger = pino({
    transport: {
        target: 'pino-pretty'
    },
})

//todo: add swagger
const createLog: any = async (req: Request, res: Response) => {
    if (!req.body) return res.sendStatus(400);

    const logLevel: String = req.body.logLevel;
    const logMessage: String = req.body.logMessage;
    printLog(logLevel, logMessage);
    eventEmitter.emit(logLevel.toString(), logMessage);
    res.send(logMessage);
};

const printLog: any = (logLevel: LogLevel, logMessage: String) => {
    if (logLevel === LogLevel.FATAL) {
        logger.fatal(logMessage);
    } else if (logLevel === LogLevel.ERROR) {
        logger.error(logMessage);
    } else if (logLevel === LogLevel.WARN) {
        logger.warn(logMessage);
    } else if (logLevel === LogLevel.INFO) {
        logger.info(logMessage);
    } else if (logLevel === LogLevel.DEBUG) {
        logger.debug(logMessage);
    } else if (logLevel === LogLevel.TRACE) {
        logger.trace(logMessage);
    }
}

export default { createLog, eventEmitter };

