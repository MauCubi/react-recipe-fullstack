"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./database/config");
const cors_1 = __importDefault(require("cors"));
const express = require('express');
require('dotenv').config();
const app = express();
(0, config_1.dbConnection)();
app.use((0, cors_1.default)());
app.use(express.static('public'));
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/users', require('./routes/users'));
app.listen(process.env.PORT, () => {
    console.log(`Corriendo en puerto ${process.env.PORT}`);
});
