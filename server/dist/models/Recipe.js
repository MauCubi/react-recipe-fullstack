"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ingredientsSchema = new mongoose_1.Schema({
    name: { type: String },
    quantity: { type: String },
    unit: { type: String },
});
const timeSchema = new mongoose_1.Schema({
    time: { type: Number },
    unit: { type: String },
});
const stepsSchema = new mongoose_1.Schema({
    name: { type: String },
});
const RecipeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    rating: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    cookTime: {
        type: timeSchema,
        required: true
    },
    steps: {
        type: [stepsSchema],
        required: true
    },
    ingredients: {
        type: [ingredientsSchema],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });
const Recipe = (0, mongoose_1.model)('Recipe', RecipeSchema);
exports.default = Recipe;
