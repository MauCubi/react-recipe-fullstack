import { Router } from 'express';
import { createRecipeReview, deleteReview, getRecipeReviews, getRecipeUserReview } from '../controllers/reviews';
import { validateJWT } from '../middlewares/jwt-validators';
import { fieldValidator } from '../middlewares/field-validators';
import { check } from 'express-validator';


const router = Router()

router.get('/:id', getRecipeReviews )

router.get('/:id/userreview', validateJWT, getRecipeUserReview )

router.delete('/:id', validateJWT, deleteReview )

router.post('/',[ 
    check('rating', 'El rating es obligatorio').not().isEmpty(),
    fieldValidator, 
    validateJWT
], createRecipeReview)


module.exports = router