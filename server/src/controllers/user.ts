import { Types } from 'mongoose'
import User from '../models/User'
import { Request, Response } from 'express';
import Recipe from '../models/Recipe';
import Favorite from '../models/Favorite';
import Review from '../models/Review';


interface UserRequest extends Request {
    uid: Types.ObjectId
}

interface UserProfile {
    recipesCount: string,
    favoritesCount: string,
    commentsCount: string,
    ratingsCount: string,
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


export const getUser = async (req: UserRequest, res: Response) => {

    const id = req.params.id

    

    try {

        const user = await User.findById(id)

        const recipesCount = await Recipe.find({user: id}).countDocuments()
        const favoritesCount = await Favorite.find({user: id}).countDocuments()
        const reviewCount = await Review.find({user: id}).countDocuments()
        const commentCount = await Review.find({user: id, comment : {"$exists" : true, "$ne" : ""}}).countDocuments()      
        

        res.json({
            ok: true,
            username: user.name,
            avatar: user.avatar,
            recipesCount,
            favoritesCount,
            reviewCount,
            commentCount
        })

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error al obtener datos del usuario'
        })
    }
}