import { Request, Response } from 'express';
import Review from '../models/Review';
import { Types } from 'mongoose';


interface ReviewRequest extends Request {
    uid: Types.ObjectId
}

interface ReviewDistribution {
    value: number
    quantity: number
    percentage: number
}

interface RecipeReviewInfo {
    sum: number
    num: number
    average: number
}

export const getRecipeReviews = async (req: ReviewRequest, res: Response) => {

    const id = req.params.id 
            
    try {

        const reviews = await Review.find().where('recipe', id).populate('user')
        const reviewDistribution: ReviewDistribution[] = []         

        let reviewsInfo: RecipeReviewInfo = {
            average: 0,
            sum: 0,
            num: reviews.length
        }        
   
        
        if (reviews.length !== 0) {
            reviewsInfo.sum = reviews.map(a => a.rating).reduce(function(a, b)
            {
                return a + b;
            });        
    
            for (let index = 0; index <= 4; index++){           
    
                const value = index + 1           
                
                const quantity = reviews.filter( x => x.rating === index + 1 ).length  
                
                let percentage
    
                if (quantity !== 0) {               
                    percentage = Number( ((quantity / reviews.length) * 100).toFixed(2) ) 
                } else {
                    percentage = 0
                }
    
                const singleReview: ReviewDistribution = {value, quantity, percentage}
                
                reviewDistribution.push(singleReview)
            }
    
            reviewsInfo.average = Number((reviewsInfo.sum / reviews.length).toFixed(2))  
            
        }
    
        res.json({
            ok: true,
            reviews,
            reviewDistribution,
            reviewsInfo
            
        })
        
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'Error al obtener Reviews'
        })
    }


}

export const createRecipeReview = async (req: ReviewRequest, res: Response) => {

    
    const review = new Review(req.body)
    
    review.user = req.uid

    try {        
        const reviewSaved = await review.save()
        
        res.json({
            ok:true,
            reviewSaved
        })

    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'Error al crear Review'
        })
    }    

}

export const getRecipeUserReview = async (req: ReviewRequest, res: Response) => {

    const id = req.params.id 
    const uid = req.uid

    try {

        const userReview = await Review.findOne().where('recipe', id).where('user', uid)         

        res.json({
            ok: true,
            userReview
        })
        
    } catch (error) {
        
        res.status(500).json({
            ok:false,
            msg:'Error de traer review de usuario'
        })
    }

}