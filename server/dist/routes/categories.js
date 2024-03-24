"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const field_validators_1 = require("../middlewares/field-validators");
const jwt_validators_1 = require("../middlewares/jwt-validators");
const categories_1 = require("../controllers/categories");
const router = (0, express_1.Router)();
router.get('/', categories_1.getCategories);
router.post('/', [
    (0, express_validator_1.check)('name', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    field_validators_1.fieldValidator,
    jwt_validators_1.validateJWT
], categories_1.createCategory);
router.put('/:id', [
    (0, express_validator_1.check)('name', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    field_validators_1.fieldValidator,
    jwt_validators_1.validateJWT
], categories_1.updateCategory);
module.exports = router;
