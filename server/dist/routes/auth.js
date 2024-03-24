"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../controllers/auth");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const field_validators_1 = require("../middlewares/field-validators");
const jwt_validators_1 = require("../middlewares/jwt-validators");
const router = (0, express_1.Router)();
router.post('/register', [
    (0, express_validator_1.check)('name', 'El nombre de usuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El email es necesario').not().isEmpty()
        .isEmail().withMessage('El email es inválido'),
    (0, express_validator_1.check)('password', 'El password debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    field_validators_1.fieldValidator
], auth_1.createUser);
router.post('/', [
    (0, express_validator_1.check)('email', 'El email es invalido').isEmail(),
    (0, express_validator_1.check)('password', 'El password debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    field_validators_1.fieldValidator
], auth_1.loginUser);
router.get('/renew', jwt_validators_1.validateJWT, auth_1.renewToken);
module.exports = router;
