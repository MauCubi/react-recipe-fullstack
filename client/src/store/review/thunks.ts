import recipeApi from '../../api/recipeApi';
import { FormReviewData } from '../../components/recipes/showPage/RecipeReviewForm'
import { ReviewsInfo } from '../../types';
import { AppDispatch } from '../store'
import { onChangeReviewsStatus, onChangeUserReviewStatus, onCreateReview, onLoadReviews, onSetUserReview } from './reviewSlice'



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
                

            } catch (error) {
                console.log('Error creando review')
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

