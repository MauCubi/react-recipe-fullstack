"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldValidator = void 0;
const validation_result_1 = require("express-validator/src/validation-result");
const fieldValidator = (req, res, next) => {
    const errors = (0, validation_result_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    next();
};
exports.fieldValidator = fieldValidator;
