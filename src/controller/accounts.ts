import {Request, Response} from 'express';
import {Role} from "../dto/account";
const jwt = require("jsonwebtoken");
const secretKey = "mySecretKey";
import {Account} from '../server'

// todo test
const getAccounts: any = async (req: Request, res: Response) => {
    console.log(Account);
    let find = await Account.find();
    res.send(find);
};

const getAccountById: any = async (req: Request, res: Response) => {
    const result = await Account.findById(req.params.id);

    if (result) {
        res.send(result);
    } else {
        res.status(404).send();
    }
};

const createAccount: any = async (req: Request, res: Response) => {
    if (!req.body) return res.sendStatus(400);

    const accountName: String = req.body.name;
    const accountRole: Role = req.body.role;

    const role = accountRole ? accountRole : Role.USER;

    const token = jwt.sign(
        {account_name: accountName, role: accountRole},
        secretKey,
        {
            expiresIn: "2h",
        }
    );

    const result = await Account.create({name: accountName, token: token, role: role});

    res.send(result);
};

const updateAccount: any = async (req: Request, res: Response) => {

    if (!req.body) return res.sendStatus(400);

    await Account.findByIdAndUpdate(req.params.id, {name : req.body.name})
    const result = await Account.findById(req.params.id);

    if (result) {
        res.send(result);
    } else {
        res.status(404).send(req.params.id);
    }
};

const deleteAccount: any = async (req: Request, res: Response) => {
    let result = await Account.findByIdAndRemove(req.params.id);

    if (result) {
        res.sendStatus(204);
    } else {
        res.status(404).send();
    }
};

const getAccountTokensByAccountId: any = async (req: Request, res: Response) => {
    const result = await Account.findById(req.params.id);

    if (result) {
        res.send(result.token);
    } else {
        res.status(404).send();
    }
};

const createAccountToken: any = async (req: Request, res: Response) => {
    if (!req.body) return res.sendStatus(400);

    const account = await Account.findById(req.params.id);

    if (!account) {
        res.status(404).send(req.params.id);
    }

    await Account.findByIdAndUpdate(req.params.id,
        {token: jwt.sign(
                {account_name: account.name},
                secretKey,
                {
                    expiresIn: "2h",
                }
            )});

    let result = await Account.findById(req.params.id, 'token');

    if (result) {
        res.send(result);
    } else {
        res.sendStatus(500);
    }
};

const updateAccountToken: any = async (req: Request, res: Response) => {
    if (!req.body) return res.sendStatus(400);

    const accountSourceToken: String = req.body.sourceToken;
    const accountTargetToken: String = req.body.targetToken;

    const account = await Account.findById(req.params.id);

    if (!account) {
        res.status(404).send(req.params.id);
    }

    if (account.token !== accountSourceToken) {
        res.status(404).send(req.params.id);
    }


    await Account.findByIdAndUpdate(req.params.id,
        {
            token: accountTargetToken
        });

    let result = await Account.findById(req.params.id, 'token');

    if (result) {
        res.send(result);
    } else {
        res.sendStatus(500);
    }
};

const deleteAccountToken: any = async (req: Request, res: Response) => {
    if (!req.body) return res.sendStatus(400);

    const account = await Account.findById(req.params.id);

    if (!account) {
        res.status(404).send(req.params.id);
    }

    await Account.findByIdAndUpdate(req.params.id,
        {
            token: ''
        });

    let result = await Account.findById(req.params.id);

    if (result) {
        res.send(result);
    } else {
        res.sendStatus(500);
    }
};

export default {
    getAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount,
    getAccountTokensByAccountId,
    createAccountToken,
    updateAccountToken,
    deleteAccountToken
};

