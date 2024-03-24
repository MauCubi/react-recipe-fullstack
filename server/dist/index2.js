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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const express = require('express');
const body = require('body-parser');
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const app = express();
            const mongo = yield mongodb_1.MongoClient.connect('mongodb+srv://mern_user:dhzyIL0nvupaV6IU@miclustercafe.ex7ag5u.mongodb.net/mern_recipes');
            yield mongo.connect();
            app.db = mongo.db();
            app.use(body.json({
                limit: '500kb'
            }));
            app.use('/usuarios', require('./routes/usuarios'));
            app.listen(3000, () => {
                console.log('Corriendo server puerto 3000');
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
start();
