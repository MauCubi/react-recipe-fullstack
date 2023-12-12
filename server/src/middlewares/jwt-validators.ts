import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';


interface JwtPayload {
    uid: string
    name: string
}

export interface IUserRequest extends Request {
    uid: string
    name: string
}

export const validateJWT = ( req: IUserRequest, res: Response, next: NextFunction ) => {
    
    // x-token header
    const token = req.header('x-token')

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
        
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        ) as JwtPayload       

        req.uid = uid
        req.name = name

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }
    
    next()

}

