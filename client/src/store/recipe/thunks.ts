
import { AxiosError } from 'axios'
import recipeApi from '../../api/recipeApi'
import { AppDispatch } from '../store'
import { onLoadRecipe, onLoadRecipes, onLoadRecipesByCategory, setCompleteSaving, setLoading, setLoadingRecipes, setSaving } from './recipeSlice'
import { imageUpload } from '../../helpers/imageUpload'
import { FormRecipeData } from '../../pages/recipe/RecipeCreate'




export const startLoadingRecipes = (category?: string) => {    

    return async( dispatch: AppDispatch ) => {         
            
            try {        

                dispatch(setLoadingRecipes(true))

                if (category) {                    
                    const { data } = await recipeApi.get(`/recipes/category/${category}`)                                         
                    dispatch(onLoadRecipesByCategory(data))                    
                } else {
                    const { data } = await recipeApi.get('/recipes')                    
                    dispatch(onLoadRecipes(data)) 
                }
                

            } catch (error) {
                console.log('Error cargando recetas')
                console.log(error);
            }

    }

}


export const startLoadingRecipe = (id: string) => {

    return async( dispatch: AppDispatch) => {    

            
        dispatch(setLoading(true))      

            try {                        

                const { data } = await recipeApi.get(`/recipes/${id}`)          
                dispatch(onLoadRecipe(data.recipe))      

            } catch (error) {

                console.log('Error cargando recetas')
                if (error instanceof AxiosError) {                    
                    if (error.response?.data.msg === 'Id Invalido') {
                        console.log('Error en el id')
                        window.location.href='/recipes/404'
                    }
                } else {
                    console.log(error);
                }
            }       
           

    }

}

export const startSavingRecipe = ( recipeData: FormRecipeData ) => {

    return async( dispatch: AppDispatch ) => {

        dispatch( setSaving() );

        try {
            const fileUploadPromise = imageUpload( recipeData.image[0] as File )
            const pictureUrl = await Promise.resolve( fileUploadPromise );  
            
            recipeData.image = pictureUrl

            const { data } = await recipeApi.post('/recipes', recipeData);
            console.log(data)
            
        } catch (error) {
            console.log(error)
        }   
        
        dispatch( setCompleteSaving() );

    }

}