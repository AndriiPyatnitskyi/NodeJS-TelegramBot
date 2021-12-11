import express from 'express';
import controller from '../controller/logs';
import {Role} from "../dto/account";
import logLevelSchema from "../validator/logValidator";
const permit = require("../middleware/auth");
const { validator } = require('express-fastest-validator');
const logRouter = express.Router();

logRouter.post('/api/logs', validator(logLevelSchema), permit([Role.ANONYMOUS, Role.USER, Role.ADMIN]), controller.createLog);

export default logRouter;
