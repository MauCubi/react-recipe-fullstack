import { Router } from 'express';
import { createRecipe, deleteRecipe, getRecipe, getRecipes, updateRecipe } from '../controllers/recipes';
import { check } from 'express-validator';
import { validateJWT } from '../middlewares/jwt-validators';
import { fieldValidator } from '../middlewares/field-validators';

const router = Router()



// Obtener recetas
router.get('/', getRecipes)

router.get('/:id', getRecipe)

// Crear receta
router.post('/', [
    check('name', 'El nombre de la receta es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('category', 'La categoria es obligatoria').not().isEmpty(),
    check('cookTime', 'El tiempo de preparacion es requerido').not().isEmpty(),
    check('steps', 'Los pasos son requeridos').not().isEmpty(),
    check('ingredients', 'Los ingredientes son necesarios').not().isEmpty(),
    check('image', 'La imagen es necesaria').not().isEmpty(),
    fieldValidator,
    validateJWT
] ,createRecipe)

// Actualizar receta
router.put('/:id', [
    check('name', 'El nombre de la receta es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('category', 'La categoria es obligatoria').not().isEmpty(),
    check('cookTime', 'El tiempo de preparacion es requerido').not().isEmpty(),
    check('steps', 'Los pasos son requeridos').not().isEmpty(),
    check('ingredients', 'Los ingredientes son necesarios').not().isEmpty(),
    check('image', 'La imagen es necesaria').not().isEmpty(),
    fieldValidator,
    validateJWT
], updateRecipe)

// Borrar receta
router.delete('/:id', validateJWT, deleteRecipe)


module.exports = router