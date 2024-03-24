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
exports.updateReview = exports.deleteReview = exports.getRecipeUserReview = exports.createRecipeReview = exports.getRecipeReviews = void 0;
const Review_1 = __importDefault(require("../models/Review"));
const getRecipeReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const reviews = yield Review_1.default.find().where('recipe', id).populate('user');
        const reviewDistribution = [];
        let reviewsInfo = {
            average: 0,
            sum: 0,
            num: reviews.length
        };
        if (reviews.length !== 0) {
            reviewsInfo.sum = reviews.map(a => a.rating).reduce(function (a, b) {
                return a + b;
            });
            for (let index = 0; index <= 4; index++) {
                const value = index + 1;
                const quantity = reviews.filter(x => x.rating === index + 1).length;
                let percentage;
                if (quantity !== 0) {
                    percentage = Number(((quantity / reviews.length) * 100).toFixed(2));
                }
                else {
                    percentage = 0;
                }
                const singleReview = { value, quantity, percentage };
                reviewDistribution.push(singleReview);
            }
            reviewsInfo.average = Number((reviewsInfo.sum / reviews.length).toFixed(2));
        }
        res.json({
            ok: true,
            reviews,
            reviewDistribution,
            reviewsInfo
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Error al obtener Reviews'
        });
    }
});
exports.getRecipeReviews = getRecipeReviews;
const createRecipeReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const review = new Review_1.default(req.body);
    review.user = req.uid;
    try {
        const reviewSaved = yield review.save();
        res.json({
            ok: true,
            reviewSaved
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Error al crear Review'
        });
    }
});
exports.createRecipeReview = createRecipeReview;
const getRecipeUserReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const userReview = yield Review_1.default.findOne().where('recipe', id).where('user', uid);
        res.json({
            ok: true,
            userReview
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error de traer review de usuario'
        });
    }
});
exports.getRecipeUserReview = getRecipeUserReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const reviewDeleted = yield Review_1.default.findByIdAndDelete(id);
        res.json({
            ok: true,
            reviewDeleted
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error borrando la reseña'
        });
    }
});
exports.deleteReview = deleteReview;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const review = req.body;
    try {
        const userReview = yield Review_1.default.findByIdAndUpdate(id, review, { new: true });
        res.json({
            ok: true,
            userReview
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error actualizando la reseña'
        });
    }
});
exports.updateReview = updateReview;
