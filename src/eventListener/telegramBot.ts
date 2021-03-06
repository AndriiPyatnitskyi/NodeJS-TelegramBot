import {EventEmitter} from "events";
import {LogLevel} from "../enum/logLevel";
const { Telegraf } = require('telegraf');
const TOKEN = '5066002319:AAGTWsbfA9zlXtrw587L9BafvvHn_ff8YT4';
const CHAT_ID = '466020701';
const bot = new Telegraf(TOKEN);

export default (eventEmitter: EventEmitter) => {

    Object.keys(LogLevel)
        .forEach(loglevel =>
        {
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


