import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator/src/validation-result';


export const fieldValidator = (req: Request, res: Response, next: NextFunction) => {

    // Errores
    const errors = validationResult( req )
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        })
    }

    next()

}
