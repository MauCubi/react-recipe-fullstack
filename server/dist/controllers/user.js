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
exports.getUser = exports.updateUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const Recipe_1 = __importDefault(require("../models/Recipe"));
const Favorite_1 = __importDefault(require("../models/Favorite"));
const Review_1 = __importDefault(require("../models/Review"));
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const settings = req.body;
    try {
        const user = yield User_1.default.findByIdAndUpdate(id, req.body, { new: true });
        res.json({
            ok: true,
            user
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error'
        });
    }
});
exports.updateUser = updateUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const userPromise = User_1.default.findById(id);
        const recipesPromise = Recipe_1.default.find({ user: id });
        const favoritesCountPromise = Favorite_1.default.find({ user: id }).countDocuments();
        const reviewsPromise = Review_1.default.find({ user: id });
        const [user, recipes, favoritesCount, reviews] = yield Promise.all([userPromise, recipesPromise, favoritesCountPromise, reviewsPromise]);
        const commentsCount = reviews.filter(x => x.comment !== '').length;
        const reviewsCount = reviews.length;
        const recipesCount = recipes.length;
        res.json({
            ok: true,
            name: user.name,
            avatar: user.avatar,
            recipes,
            recipesCount,
            favoritesCount,
            reviewsCount,
            commentsCount
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener datos del usuario'
        });
    }
});
exports.getUser = getUser;
