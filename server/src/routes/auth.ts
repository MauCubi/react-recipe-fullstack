import { createUser, loginUser, renewToken } from '../controllers/auth'
import { Router } from 'express'
import { check } from 'express-validator'
import { fieldValidator } from '../middlewares/field-validators'
import { validateJWT } from '../middlewares/jwt-validators'
// const { Router } = require('express')

const router = Router()



router.post(
    '/register', 
    [
        check('name', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('email', 'El email es necesario').not().isEmpty()
            .isEmail().withMessage('El email es inválido'),
        check('password', 'El password debe tener mínimo 6 caracteres').isLength({min: 6}),
        fieldValidator
    ], 
    createUser)

router.post(
    '/',
    [        
        check('email', 'El email es invalido').isEmail(),
        check('password', 'El password debe tener mínimo 6 caracteres').isLength({min: 6}),
        fieldValidator
    ], 
    loginUser)

router.get('/renew', validateJWT, renewToken)

module.exports = router