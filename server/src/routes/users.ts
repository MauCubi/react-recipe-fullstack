
import { Router } from 'express'
import { check } from 'express-validator'
import { fieldValidator } from '../middlewares/field-validators'
import { validateJWT } from '../middlewares/jwt-validators'
import { getUser, updateUser } from '../controllers/user'


const router = Router()


router.put('/:id',[fieldValidator, validateJWT], updateUser )

router.get('/:id', getUser )

module.exports = router