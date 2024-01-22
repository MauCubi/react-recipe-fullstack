import { Types } from 'mongoose'
import User from '../models/User'
import { Request, Response } from 'express';


interface UserRequest extends Request {
    uid: Types.ObjectId
}

export const updateUser = async (req: UserRequest, res: Response) => { 

    const id = req.params.id
    const settings = req.body
    
    try {         
             
      const user = await User.findByIdAndUpdate(id, req.body, {new: true})

      res.json({
        ok: true,
        user
    })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
}