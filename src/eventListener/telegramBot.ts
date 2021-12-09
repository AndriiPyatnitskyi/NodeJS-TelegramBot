//https://t.me/NodeJsDemoLogConsumerBot
import {EventEmitter} from "events";
import {LogLevel} from "../enum/logLevel";
const { Telegraf } = require('telegraf');
const TOKEN = '5066002319:AAGTWsbfA9zlXtrw587L9BafvvHn_ff8YT4';
const CHAT_ID = '466020701';
const bot = new Telegraf(TOKEN);

export default (eventEmitter: EventEmitter) => {

    // enum LogLevel {
    //     FATAL = "FATAL",
    //     ERROR = "ERROR",
    //     WARN = "WARN",
    //     INFO = "INFO",
    //     DEBUG = "DEBUG",
    //     TRACE = "TRACE"
    // }

    Object.keys(LogLevel)
        .forEach(loglevel =>
        {
            console.log(loglevel);
            eventEmitter.on(loglevel.toString(), (logMessage) => bot.telegram.sendMessage(CHAT_ID, `
            Log level: ${loglevel}
            Message: ${logMessage}`
            ));
        }
        );

    bot.start( (ctx:any) => ctx.reply(`
    Hi ${ctx.from.first_name}!
    This demo bot provides logs"`
    ));


    bot.launch();
}


