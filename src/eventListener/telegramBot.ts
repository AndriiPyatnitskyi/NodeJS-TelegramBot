//https://t.me/NodeJsDemoLogConsumerBot
import {EventEmitter} from "events";


export default (eventEmitter: EventEmitter) => {

    console.log('111');

    const { Telegraf } = require('telegraf');
    const covidApi = require('covid19-api');
    const COUNTRIES_LIST = require('../../const');

    eventEmitter.on('myEvent', (logMessage) => {
        bot.telegram.sendMessage(CHAT_ID, logMessage);
    });

    const TOKEN = '5066002319:AAGTWsbfA9zlXtrw587L9BafvvHn_ff8YT4';
    const CHAT_ID = '466020701';
    const bot = new Telegraf(TOKEN);

    bot.start( (ctx:any) => ctx.reply(`
    Привет ${ctx.from.first_name}!
    Узнай статистику по Коронавирусу.
    Введи страну на английском языке и получи статистику.
    Получить весь список стран можно по команде /help."
`));

    bot.help( (ctx:any) => ctx.reply(COUNTRIES_LIST)); // список всех стран на английском языке можно взять в документации covid19-api
    bot.on('text', async (ctx:any) => {
        try {
            const userText = ctx.message.text
            const covidData = await covidApi.getReportsByCountries(userText)
            const countryData = covidData[0][0]
            const formatData = `
            Страна: ${countryData.country},
            Случаи: ${countryData.cases},
            Смерти: ${countryData.deaths},
            Выздоровело: ${countryData.recovered}`
            ctx.reply(formatData);
        } catch(e) {
            ctx.reply('Такой страны не существует, для получения списка стран используй команду /help');
        }
    })

    bot.launch();


    // async function sleep(ms: number) {
    //     return new Promise((resolve) => {
    //         setTimeout(resolve, ms);
    //     });
    // }

    // sleep(3000).then(a => bot.telegram.sendMessage(CHAT_ID, 'Hello World test'));
}

