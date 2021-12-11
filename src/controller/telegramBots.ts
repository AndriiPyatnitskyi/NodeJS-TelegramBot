import {Request, Response} from 'express';

const getTelegramBotLink: any = async (req: Request, res: Response) => {
    res.send("https://t.me/NodeJsDemoLogConsumerBot");
};

export default { getTelegramBotLink };

