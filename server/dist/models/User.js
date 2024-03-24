"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/dcavctpft/image/upload/v1705873948/recipes/coco_xf92zy.jpg'
    }
});
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
