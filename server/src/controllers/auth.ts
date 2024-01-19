import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import User from '../models/User'
import { IUser } from '../models/User'
import { validationResult } from 'express-validator/src/validation-result'
import { generateJWT } from '../helpers/jwt'
import { IUserRequest } from '../middlewares/jwt-validators'


export const createUser = async (req: Request, res: Response) => {

    const { name, email, password} = req.body
    
    try {        
        
        let user = await User.findOne({ $or: [
            {name: name},
            {email: email}
        ]})
        
        
        if (user) {

            let message: string

            if (user.name === name && user.email === email) {
                message = 'Nombre de usuario y email ya en uso'
            } else if ( user.name === name ){
                message = 'Nombre de usuario ya en uso'
            } else if ( user.email === email){
                message = 'Email ya en uso'
            }

            return res.status(400).json({
                ok: false,
                msg: message
            })
        }

        user = new User( req.body )
        
        // Encriptar password
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync( password, salt )
        
        await user.save()        
        
        // Generar JWT
        const token = await generateJWT( user.id, user.name )
        
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            avatar: user.avatar,
            token
        })          
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })        
    }
}



export const loginUser = async (req: Request, res: Response) => {

    const { email, password } = req.body    

    try {

        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario con ese email no existe'
            })
        }

        // Confirmar password
        const validPassword = bcrypt.compareSync( password, user.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }


        // Generar JWT
        const token = await generateJWT( user.id, user.name )

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            avatar: user.avatar,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador'
        })    
    }

}

export const renewToken = async (req: IUserRequest, res: Response) => {

    console.log(req)

    const uid = req.uid
    const name = req.name
    const user = await User.findById(uid)
    const avatar = user.avatar

    // Generar JWT
    const token = await generateJWT( uid, name )

    res.json({
        ok:true,
        uid, name, avatar,
        token
    })

}

