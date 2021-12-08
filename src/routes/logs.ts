import express from 'express';
import controller from '../controller/logs';
import {Role} from "../dto/account";
const permit = require("../middleware/auth");
const logRouter = express.Router();

logRouter.post('/api/logs', permit([Role.ANONYMOUS, Role.USER, Role.ADMIN]), controller.createLog);

export default logRouter;
