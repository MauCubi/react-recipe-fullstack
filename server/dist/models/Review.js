"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    rating: {
        type: Number,
        required: true,
        unique: false,
    },
    comment: {
        type: String,
        required: false,
        unique: false
    },
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
const Review = (0, mongoose_1.model)('Review', ReviewSchema);
exports.default = Review;
