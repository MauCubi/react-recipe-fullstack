"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviews_1 = require("../controllers/reviews");
const jwt_validators_1 = require("../middlewares/jwt-validators");
const field_validators_1 = require("../middlewares/field-validators");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get('/:id', reviews_1.getRecipeReviews);
router.get('/:id/userreview', jwt_validators_1.validateJWT, reviews_1.getRecipeUserReview);
router.delete('/:id', jwt_validators_1.validateJWT, reviews_1.deleteReview);
router.post('/', [
    (0, express_validator_1.check)('rating', 'El rating es obligatorio').not().isEmpty(),
    field_validators_1.fieldValidator,
    jwt_validators_1.validateJWT
], reviews_1.createRecipeReview);
router.put('/:id', [
    (0, express_validator_1.check)('rating', 'El rating es obligatorio').not().isEmpty(),
    field_validators_1.fieldValidator,
    jwt_validators_1.validateJWT
], reviews_1.updateReview);
module.exports = router;
