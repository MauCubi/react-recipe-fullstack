"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FavoriteSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipe: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
});
const Favorite = (0, mongoose_1.model)('Favorite', FavoriteSchema);
exports.default = Favorite;
