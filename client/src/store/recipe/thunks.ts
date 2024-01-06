
import { AxiosError } from 'axios'
import recipeApi from '../../api/recipeApi'
import { AppDispatch } from '../store'
import { onAddRemoveVaforite, onLoadFavorites, onLoadRecipe, onLoadRecipes, onLoadingSugestions, setLoading, setLoadingRecipes, setLoadingSugestions, setSaving } from './recipeSlice'
import { imageUpload } from '../../helpers/imageUpload'
import { FormRecipeData } from '../../pages/recipe/RecipeCreate'




export const startLoadingRecipes = (category?: string, page?: number, search?:string) => {     
    
    return async( dispatch: AppDispatch ) => {        

        try {           
            
            dispatch(setLoadingRecipes(true))            

            if (category) {                    
                if (category === 'mis-favoritos') {
                    const { data } = await recipeApi.get(`/recipes/favorites/fullget?page=${page}`)  
                    dispatch(onLoadRecipes(data))
                } else {
                    const { data } = await recipeApi.get(`/recipes/category/${category.replace(/-/g, ' ')}?page=${page}`)                                         
                    dispatch(onLoadRecipes(data))
                }
            } else if(search){
                const { data } = await recipeApi.get(`/recipes/search/${search}?page=${page}`)                    
                dispatch(onLoadRecipes(data))
            } else {
                const { data } = await recipeApi.get(`/recipes?page=${page}`)                    
                dispatch(onLoadRecipes(data))
            }
                

            } catch (error) {
                console.log('Error cargando recetas')
                console.log(error);
            }

    }

}

export const startLoadingSugestions = (search?:string) => {     
    
    return async( dispatch: AppDispatch ) => {        

        try {           
            
            dispatch(setLoadingSugestions(true))  
            
            const { data } = await recipeApi.get(`/recipes/sugestion/${search}`) 

            dispatch(onLoadingSugestions(data))
            
            console.log(data.recipes)

            } catch (error) {
                console.log('Error cargando sugerencias')
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
                dispatch(setLoading(false))    
                

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

            const { data } = await recipeApi.post('/recipes', recipeData)

            return data.receta            
            
        } catch (error) {
            console.log(error)
        }     

    }

}


export const startLoadingFavorites = () => {       
    
    return async( dispatch: AppDispatch ) => {        
        
            try {       
           
                const { data } = await recipeApi.get(`/recipes/favorites/get`)        
                dispatch(onLoadFavorites(data))                

            } catch (error) {
                console.log('Error cargando favoritos')
                console.log(error);
            }

    }

}

export const startAddRemoveFavorite = ( id: string ) => {       
    
    return async( dispatch: AppDispatch ) => {        
        
            try {       
           
                await recipeApi.post(`/recipes/favorite/${id}`)        
                dispatch(onAddRemoveVaforite(id))

            } catch (error) {
                console.log('Error cargando favoritos')
                console.log(error);
            }

    }

}
