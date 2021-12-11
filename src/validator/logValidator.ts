import {LogLevel} from "../enum/logLevel";

const logLevelSchema = {
    body: {
        logMessage: { type: 'string', min: 3, max: 15 },
        logLevel: {
            type: 'string',
            optional: true,
            enum: [
                LogLevel.FATAL.toString(),
                LogLevel.ERROR.toString(),
                LogLevel.WARN.toString(),
                LogLevel.INFO.toString(),
                LogLevel.DEBUG.toString(),
                LogLevel.TRACE.toString()
            ]}
    },
};

export default logLevelSchema;
