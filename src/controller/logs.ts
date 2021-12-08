import {Request, Response} from 'express';

const pino = require("pino");

const logger = pino({
    transport: {
        target: 'pino-pretty'
    },
})

const createLog: any = async (req: Request, res: Response) => {
    if (!req.body) return res.sendStatus(400);

    const logMessage: String = req.body.logMessage;
    logger.error(logMessage);
    res.send(logMessage);
};

export default { createLog };

