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

        const userPromise = User.findById(id)
        const recipesPromise = Recipe.find({user: id})
        const favoritesCountPromise = Favorite.find({user: id}).countDocuments()
        const reviewsPromise = Review.find({user: id}) 

        const  [user, recipes, favoritesCount, reviews]  = await Promise.all([userPromise, recipesPromise, favoritesCountPromise, reviewsPromise])
        
        const commentsCount = reviews.filter( x => x.comment !== '' ).length
        const reviewsCount = reviews.length
        const recipesCount = recipes.length
        

        res.json({
            ok: true,
            name: user.name,
            avatar: user.avatar,
            recipes,
            recipesCount,
            favoritesCount,
            reviewsCount,
            commentsCount
        })

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error al obtener datos del usuario'
        })
    }
}