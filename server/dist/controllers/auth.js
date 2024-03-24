"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewToken = exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../helpers/jwt");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        let user = yield User_1.default.findOne({ $or: [
                { name: name },
                { email: email }
            ] });
        if (user) {
            let message;
            if (user.name === name && user.email === email) {
                message = 'Nombre de usuario y email ya en uso';
            }
            else if (user.name === name) {
                message = 'Nombre de usuario ya en uso';
            }
            else if (user.email === email) {
                message = 'Email ya en uso';
            }
            return res.status(400).json({
                ok: false,
                msg: message
            });
        }
        user = new User_1.default(req.body);
        const salt = bcrypt_1.default.genSaltSync();
        user.password = bcrypt_1.default.hashSync(password, salt);
        yield user.save();
        const token = yield (0, jwt_1.generateJWT)(user.id, user.name);
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            avatar: user.avatar,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario con ese email no existe'
            });
        }
        const validPassword = bcrypt_1.default.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }
        const token = yield (0, jwt_1.generateJWT)(user.id, user.name);
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            avatar: user.avatar,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
});
exports.loginUser = loginUser;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid;
    const name = req.name;
    const user = yield User_1.default.findById(uid);
    const avatar = user.avatar;
    const token = yield (0, jwt_1.generateJWT)(uid, name);
    res.json({
        ok: true,
        uid, name, avatar,
        token
    });
});
exports.renewToken = renewToken;
