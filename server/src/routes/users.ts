
import { Router } from 'express'
import { check } from 'express-validator'
import { fieldValidator } from '../middlewares/field-validators'
import { validateJWT } from '../middlewares/jwt-validators'
import { updateUser } from '../controllers/user'
// const { Router } = require('express')

const router = Router()


router.put('/:id',[fieldValidator, validateJWT], updateUser )

module.exports = router