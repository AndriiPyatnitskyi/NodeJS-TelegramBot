import {Request, Response} from 'express';
import * as fs from 'fs';
import {Role} from "../dto/account";
// import {Role, Account} from "../dto/account";

const jwt = require("jsonwebtoken");
const secretKey = "mySecretKey";
// const models = require("../server");
const Account = require("../server");
const filePath = "./accounts.json";

// todo add swagger
const getTelegramBotLink: any = async (req: Request, res: Response) => {
    res.send("https://t.me/NodeJsDemoLogConsumerBot");
};

export default {
    getTelegramBotLink
};

