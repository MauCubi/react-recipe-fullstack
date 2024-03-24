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
exports.updateRating = exports.getFullFavoritesRecipes = exports.getFavoritesRecipes = exports.addFavoriteRecipe = exports.deleteRecipe = exports.updateRecipe = exports.createRecipe = exports.getRecipesSugestion = exports.getRecipesBySearch = exports.getProfileRecipes = exports.getMyRecipes = exports.getRecipesByCategory = exports.getRecipes = exports.getRecipe = void 0;
const Recipe_1 = __importDefault(require("../models/Recipe"));
const mongoose_1 = require("mongoose");
const Category_1 = __importDefault(require("../models/Category"));
const Favorite_1 = __importDefault(require("../models/Favorite"));
const Review_1 = __importDefault(require("../models/Review"));
const ITEM_PER_PAGE = 6;
const getRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeId = req.params.id;
    if ((0, mongoose_1.isValidObjectId)(recipeId)) {
        try {
            const recipe = yield Recipe_1.default.findById(recipeId).populate(['user', 'category']);
            if (!recipe) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Receta con ese id no encontrada'
                });
            }
            return res.json({
                ok: true,
                recipe: recipe
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        }
    }
    else {
        return res.status(500).json({
            ok: false,
            msg: 'Id Invalido'
        });
    }
});
exports.getRecipe = getRecipe;
const getRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page || 1;
    const skip = (page - 1) * ITEM_PER_PAGE;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'asc';
    const countPromise = Recipe_1.default.estimatedDocumentCount();
    const recipesPromise = Recipe_1.default.find()
        .populate('user', ['name', 'email'])
        .populate('category', ['name'])
        .skip(skip)
        .limit(ITEM_PER_PAGE)
        .sort({ [sortBy.toString()]: (sortOrder === 'asc') ? 1 : -1 });
    const [count, recipes] = yield Promise.all([countPromise, recipesPromise]);
    const pageCount = count / ITEM_PER_PAGE;
    return res.json({
        ok: true,
        recipes,
        pagination: {
            count,
            pageCount
        }
    });
});
exports.getRecipes = getRecipes;
const getRecipesByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.category;
    const categoryId = yield Category_1.default.findOne({ name: { $regex: category, $options: 'i' } }).exec();
    const page = req.query.page || 1;
    const skip = (page - 1) * ITEM_PER_PAGE;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'asc';
    const countPromise = Recipe_1.default.find({ category: categoryId._id }).countDocuments();
    const recipesPromise = Recipe_1.default.find({ category: categoryId._id })
        .populate('user', ['name', 'email'])
        .populate('category', ['name'])
        .skip(skip)
        .limit(ITEM_PER_PAGE)
        .sort({ [sortBy.toString()]: (sortOrder === 'asc') ? 1 : -1 });
    const [count, recipes] = yield Promise.all([countPromise, recipesPromise]);
    const pageCount = count / ITEM_PER_PAGE;
    return res.json({
        ok: true,
        recipes,
        pagination: {
            count,
            pageCount
        }
    });
});
exports.getRecipesByCategory = getRecipesByCategory;
const getMyRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page || 1;
    const skip = (page - 1) * ITEM_PER_PAGE;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'asc';
    const countPromise = Recipe_1.default.find({ user: req.uid }).countDocuments();
    const recipesPromise = Recipe_1.default.find({ user: req.uid })
        .populate('user', ['name', 'email'])
        .populate('category', ['name'])
        .skip(skip)
        .limit(ITEM_PER_PAGE)
        .sort({ [sortBy.toString()]: (sortOrder === 'asc') ? 1 : -1 });
    const [count, recipes] = yield Promise.all([countPromise, recipesPromise]);
    const pageCount = count / ITEM_PER_PAGE;
    return res.json({
        ok: true,
        recipes,
        pagination: {
            count,
            pageCount
        }
    });
});
exports.getMyRecipes = getMyRecipes;
const getProfileRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page || 1;
    const skip = (page - 1) * ITEM_PER_PAGE;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'asc';
    const countPromise = Recipe_1.default.find({ user: req.params.id }).countDocuments();
    const recipesPromise = Recipe_1.default.find({ user: req.params.id })
        .populate('user', ['name', 'email'])
        .populate('category', ['name'])
        .skip(skip)
        .limit(ITEM_PER_PAGE)
        .sort({ [sortBy.toString()]: (sortOrder === 'asc') ? 1 : -1 });
    const [count, recipes] = yield Promise.all([countPromise, recipesPromise]);
    const pageCount = count / ITEM_PER_PAGE;
    return res.json({
        ok: true,
        recipes,
        pagination: {
            count,
            pageCount
        }
    });
});
exports.getProfileRecipes = getProfileRecipes;
const getRecipesBySearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.params.search.trim();
    const page = req.query.page || 1;
    const skip = (page - 1) * ITEM_PER_PAGE;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'asc';
    const countPromise = Recipe_1.default.find({ name: { $regex: search, $options: 'i' } }).countDocuments();
    const recipesPromise = Recipe_1.default.find({ name: { $regex: search, $options: 'i' } })
        .populate('user', ['name', 'email'])
        .populate('category', ['name'])
        .skip(skip)
        .limit(ITEM_PER_PAGE)
        .sort({ [sortBy.toString()]: (sortOrder === 'asc') ? 1 : -1 });
    const [count, recipes] = yield Promise.all([countPromise, recipesPromise]);
    const pageCount = count / ITEM_PER_PAGE;
    return res.json({
        ok: true,
        recipes,
        pagination: {
            count,
            pageCount
        }
    });
});
exports.getRecipesBySearch = getRecipesBySearch;
const getRecipesSugestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.params.search.trim();
    const recipes = yield Recipe_1.default.find({ name: { $regex: search, $options: 'i' } }).limit(5);
    return res.json({
        ok: true,
        recipes
    });
});
exports.getRecipesSugestion = getRecipesSugestion;
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = new Recipe_1.default(req.body);
    try {
        recipe.user = req.uid;
        const savedRecipe = yield recipe.save();
        res.json({
            ok: true,
            receta: savedRecipe
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.createRecipe = createRecipe;
const updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeId = req.params.id;
    try {
        const recipe = yield Recipe_1.default.findById(recipeId);
        const uid = req.uid;
        if (!recipe) {
            return res.status(404).json({
                ok: false,
                msg: 'Receta con ese id no existe'
            });
        }
        if (recipe.user.toString() !== uid.toString()) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar esta receta'
            });
        }
        ;
        const newRecipe = Object.assign(Object.assign({}, req.body), { user: uid });
        const updatedRecipe = yield Recipe_1.default.findByIdAndUpdate(recipe.id, newRecipe, { new: true });
        res.json({
            ok: true,
            updatedRecipe
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.updateRecipe = updateRecipe;
const deleteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeId = req.params.id;
    try {
        const recipe = yield Recipe_1.default.findById(recipeId);
        const uid = req.uid;
        if (!recipe) {
            return res.status(404).json({
                ok: false,
                msg: 'Receta con ese id no existe'
            });
        }
        if (recipe.user.toString() !== uid.toString()) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar esta receta'
            });
        }
        ;
        const deleteRecipePromise = Recipe_1.default.findByIdAndDelete(recipe.id);
        const deleteReviewsPromise = Review_1.default.deleteMany({ recipe: recipe.id });
        yield Promise.all([deleteRecipePromise, deleteReviewsPromise]);
        res.json({
            ok: true
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.deleteRecipe = deleteRecipe;
const addFavoriteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = req.params;
        const existFavorite = yield Favorite_1.default.findOne({ user: req.uid, recipe: recipe.id });
        if (!existFavorite) {
            const favorite = new Favorite_1.default({
                user: req.uid,
                recipe: recipe.id
            });
            const savedFavorite = yield favorite.save();
            res.json({
                ok: true,
                msg: `Favorito guardado ${savedFavorite}`
            });
        }
        else {
            const deletedFavorite = yield Favorite_1.default.findByIdAndDelete(existFavorite._id);
            res.json({
                ok: true,
                msg: `Favorito borrado: ${deletedFavorite}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.addFavoriteRecipe = addFavoriteRecipe;
const getFavoritesRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favorites = yield Favorite_1.default.find({ user: req.uid }).select({ 'recipe': 1, '_id': 0 });
        res.json({
            ok: true,
            favorites
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Error al traer favoritos'
        });
    }
});
exports.getFavoritesRecipes = getFavoritesRecipes;
const getFullFavoritesRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 1;
        const skip = (page - 1) * ITEM_PER_PAGE;
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder || 'asc';
        const countPromise = Favorite_1.default.find({ user: req.uid }).countDocuments();
        const favoritesPromise = Favorite_1.default.find({ user: req.uid })
            .populate({ path: 'recipe', populate: [{ path: 'user' }] })
            .skip(skip)
            .limit(ITEM_PER_PAGE)
            .sort({ [sortBy.toString()]: (sortOrder === 'asc') ? 1 : -1 });
        const [count, favorites] = yield Promise.all([countPromise, favoritesPromise]);
        const pageCount = count / ITEM_PER_PAGE;
        const recipes = [];
        favorites.map(favorite => (recipes.push(favorite.recipe)));
        if (sortBy === 'createdAt') {
            recipes.sort((a, b) => {
                if (sortOrder === 'desc') {
                    return b.createdAt.getTime() - a.createdAt.getTime();
                }
                else {
                    return a.createdAt.getTime() - b.createdAt.getTime();
                }
            });
        }
        else {
            recipes.sort((a, b) => {
                if (sortOrder === 'desc') {
                    return b.rating - a.rating;
                }
                else {
                    return a.rating - b.rating;
                }
            });
        }
        res.json({
            ok: true,
            recipes,
            pagination: {
                count,
                pageCount
            }
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Error al traer favoritos'
        });
    }
});
exports.getFullFavoritesRecipes = getFullFavoritesRecipes;
const updateRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeId = req.params.id;
    const averageFixed = Number(req.body.newAverage.toFixed(2));
    try {
        const recipe = yield Recipe_1.default.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({
                ok: false,
                msg: 'Receta con ese id no existe'
            });
        }
        const updatedRecipe = yield Recipe_1.default.findByIdAndUpdate(recipe.id, { rating: averageFixed }, { new: true });
        res.json({
            ok: true,
            updatedRecipe
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.updateRating = updateRating;
