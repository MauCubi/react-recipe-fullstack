import { Router } from 'express';
import { addFavoriteRecipe, createRecipe, deleteRecipe, getFavoritesRecipes, getFullFavoritesRecipes, getMyRecipes, getProfileRecipes, getRecipe, getRecipes, getRecipesByCategory, getRecipesBySearch, getRecipesSugestion, updateRating, updateRecipe } from '../controllers/recipes';
import { check } from 'express-validator';
import { validateJWT } from '../middlewares/jwt-validators';
import { fieldValidator } from '../middlewares/field-validators';

const router = Router()



// Obtener recetas
router.get('/', getRecipes)

// Obtener una sola receta
router.get('/:id', getRecipe)

// Obtener recetas de una categoria
router.get('/category/:category', getRecipesByCategory)

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

// Agregar y quitar receta a favoritos
router.post('/favorite/:id', validateJWT, addFavoriteRecipe )

// Traer id de favoritos
router.get('/favorites/get', validateJWT , getFavoritesRecipes )

// Traer los favoritos con toda la info
router.get('/favorites/fullget', validateJWT , getFullFavoritesRecipes )

// Traer las recetas propias del user
router.get('/myrecipes/get', validateJWT , getMyRecipes )

// Modificar el rating de una receta
router.put('/:id/setrating', validateJWT , updateRating )

// Obtener todas las recetas que coincidan
router.get('/search/:search', getRecipesBySearch)

// Busca de sugerencias para el searchbox
router.get('/sugestion/:search', getRecipesSugestion)

// Busca de recetas del perfil
router.get('/profile/:id', getProfileRecipes)


module.exports = router