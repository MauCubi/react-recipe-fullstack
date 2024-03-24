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
exports.getCategories = exports.updateCategory = exports.createCategory = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = new Category_1.default(req.body);
    try {
        const categorySaved = yield category.save();
        res.json({
            ok: true,
            categorySaved
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Error al crear categoria'
        });
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    try {
        const category = yield Category_1.default.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                ok: false,
                msg: 'Categoria con ese id no existe'
            });
        }
        const newCategory = Object.assign({}, req.body);
        const updatedCategory = yield Category_1.default.findByIdAndUpdate(category.id, newCategory, { new: true });
        res.json({
            ok: true,
            recipe: updatedCategory
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
exports.updateCategory = updateCategory;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.find();
        res.json({
            ok: true,
            categories
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Error al traer categorias'
        });
    }
});
exports.getCategories = getCategories;
