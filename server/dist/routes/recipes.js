"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipes_1 = require("../controllers/recipes");
const express_validator_1 = require("express-validator");
const jwt_validators_1 = require("../middlewares/jwt-validators");
const field_validators_1 = require("../middlewares/field-validators");
const router = (0, express_1.Router)();
router.get('/', recipes_1.getRecipes);
router.get('/:id', recipes_1.getRecipe);
router.get('/category/:category', recipes_1.getRecipesByCategory);
router.post('/', [
    (0, express_validator_1.check)('name', 'El nombre de la receta es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('description', 'La descripción es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('category', 'La categoria es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('cookTime', 'El tiempo de preparacion es requerido').not().isEmpty(),
    (0, express_validator_1.check)('steps', 'Los pasos son requeridos').not().isEmpty(),
    (0, express_validator_1.check)('ingredients', 'Los ingredientes son necesarios').not().isEmpty(),
    (0, express_validator_1.check)('image', 'La imagen es necesaria').not().isEmpty(),
    field_validators_1.fieldValidator,
    jwt_validators_1.validateJWT
], recipes_1.createRecipe);
router.put('/:id', [
    (0, express_validator_1.check)('name', 'El nombre de la receta es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('description', 'La descripción es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('category', 'La categoria es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('cookTime', 'El tiempo de preparacion es requerido').not().isEmpty(),
    (0, express_validator_1.check)('steps', 'Los pasos son requeridos').not().isEmpty(),
    (0, express_validator_1.check)('ingredients', 'Los ingredientes son necesarios').not().isEmpty(),
    (0, express_validator_1.check)('image', 'La imagen es necesaria').not().isEmpty(),
    field_validators_1.fieldValidator,
    jwt_validators_1.validateJWT
], recipes_1.updateRecipe);
router.delete('/:id', jwt_validators_1.validateJWT, recipes_1.deleteRecipe);
router.post('/favorite/:id', jwt_validators_1.validateJWT, recipes_1.addFavoriteRecipe);
router.get('/favorites/get', jwt_validators_1.validateJWT, recipes_1.getFavoritesRecipes);
router.get('/favorites/fullget', jwt_validators_1.validateJWT, recipes_1.getFullFavoritesRecipes);
router.get('/myrecipes/get', jwt_validators_1.validateJWT, recipes_1.getMyRecipes);
router.put('/:id/setrating', jwt_validators_1.validateJWT, recipes_1.updateRating);
router.get('/search/:search', recipes_1.getRecipesBySearch);
router.get('/sugestion/:search', recipes_1.getRecipesSugestion);
router.get('/profile/:id', recipes_1.getProfileRecipes);
module.exports = router;
