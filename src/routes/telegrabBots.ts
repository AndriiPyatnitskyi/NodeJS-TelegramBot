import express from 'express';
import controller from '../controller/telegramBots';
import {Role} from "../dto/account";

const permit = require("../middleware/auth");
const telegramBotRouter = express.Router();

telegramBotRouter.get('/api/telegramBots', permit([Role.ANONYMOUS, Role.USER, Role.ADMIN]), controller.getTelegramBotLink);

export default telegramBotRouter;
