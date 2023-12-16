import { Router } from 'express'
import { check } from 'express-validator'
import { fieldValidator } from '../middlewares/field-validators'
import { validateJWT } from '../middlewares/jwt-validators'
import { createCategory, getCategories, updateCategory } from '../controllers/categories'

const router = Router()

router.get('/', getCategories )

router.post(
    '/', 
    [
        check('name', 'El nombre de la categoria es obligatorio').not().isEmpty(),
        fieldValidator,
        validateJWT
    ], 
    createCategory)

router.put('/:id', [
    check('name', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    fieldValidator,
    validateJWT
], updateCategory)
    

module.exports = router