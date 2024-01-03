import recipeApi from '../../api/recipeApi';
import { FormReviewData } from '../../components/recipes/showPage/RecipeReviewForm'
import { Review, ReviewsInfo } from '../../types';
import { onUpdateReview } from '../recipe/recipeSlice';
import { AppDispatch } from '../store'
import { onChangeReviewsStatus, onChangeUserReviewStatus, onCreateReview, onDeleteUserReview, onLoadReviews, onSetUserReview } from './reviewSlice'



export const startCreatingReview = ( reviewData: FormReviewData, reviewsInfo: ReviewsInfo) => {       
    
    return async( dispatch: AppDispatch ) => {        
        
            try {                             
           
                const { data } = await recipeApi.post(`/reviews`, reviewData)     

                const newAverage = (reviewsInfo.sum + (reviewData.rating as number)) / (reviewsInfo.num + 1)                  
                
                const dataretrieved = await recipeApi.put(`/recipes/${reviewData.recipe}/setrating`, {newAverage})

                console.log(dataretrieved)

                               
                dispatch(onCreateReview(data.reviewSaved))
                dispatch(onChangeUserReviewStatus('idle'))
                dispatch(startLoadingReviews(reviewData.recipe))
                dispatch(onUpdateReview(newAverage))
                

            } catch (error) {
                console.log('Error creando reseña')
                console.log(error);
            }

    }

}

export const startLoadingReviews = ( id: string ) => {       
    
    return async( dispatch: AppDispatch ) => {       
        
        dispatch(onChangeReviewsStatus('loading'))
        
            try {                             
           
                const { data } = await recipeApi.get(`/reviews/${id}`)                        
                dispatch(onLoadReviews(data))   

            } catch (error) {
                console.log('Error cargando reseñas')
                console.log(error);
            }

    }

}

export const startLoadingUserReview = ( id: string ) => {       
    
    return async( dispatch: AppDispatch ) => {       
        
        dispatch(onChangeUserReviewStatus('loading'))
        
            try {                             
           
                const { data } = await recipeApi.get(`/reviews/${id}/userreview`)   
                                
                dispatch(onSetUserReview(data))   

            } catch (error) {
                console.log('Error cargando reseñas')
                console.log(error);
            }

    }

}

export const startDeletingReview = (reviewsInfo: ReviewsInfo, reviewToDelete: Review) => {       
    
    return async( dispatch: AppDispatch ) => {        
        
            try {    
                               
                const newAverage = (reviewsInfo.sum - (reviewToDelete.rating as number)) / (reviewsInfo.num - 1)                
                await recipeApi.delete(`/reviews/${reviewToDelete._id}`)

                await recipeApi.put(`/recipes/${reviewToDelete.recipe}/setrating`, {newAverage})

                dispatch(onDeleteUserReview())
                dispatch(startLoadingReviews(reviewToDelete.recipe as string))
                dispatch(onUpdateReview(newAverage))                

            } catch (error) {
                console.log('Error borrando reseña')
                console.log(error);
            }

    }

}

export const startUpdatingReview = ( reviewData: FormReviewData, reviewsInfo: ReviewsInfo, reviewToUpdate: Review) => {       
    
    return async( dispatch: AppDispatch ) => {        
        
            try {                 
                  
                const { data } = await recipeApi.put(`/reviews/${reviewToUpdate._id}`, reviewData)

                const newAverage = (reviewsInfo.sum - reviewToUpdate.rating + (reviewData.rating as number)) / reviewsInfo.num 
               
                await recipeApi.put(`/recipes/${reviewData.recipe}/setrating`, {newAverage})  

                dispatch(onSetUserReview(data))
                dispatch(startLoadingReviews(reviewData.recipe))
                dispatch(onUpdateReview(newAverage))
                

            } catch (error) {
                console.log('Error actualizando reseña')
                console.log(error);
            }

    }

}