
import { AxiosError } from 'axios'
import recipeApi from '../../api/recipeApi'
import { AppDispatch } from '../store'
import { onAddRemoveVaforite, onDeletingRecipe, onLoadFavorites, onLoadRecipe, onLoadRecipes, onLoadingSugestions, setDeletingRecipe, setLoading, setLoadingRecipes, setLoadingSugestions, setSaving } from './recipeSlice'
import { imageUpload } from '../../helpers/imageUpload'
import { FormRecipeData } from '../../components/recipes/createUpdatePage/RecipeForm';


export const startLoadingRecipes = (sortBy:string, sortOrder:string, category?: string, page?: number, search?:string, userid?:string) => {     
    
    return async( dispatch: AppDispatch ) => {        

        try {           
            
            dispatch(setLoadingRecipes(true))  

            if (category) {                    
                if (category === 'mis-favoritos') {
                    const { data } = await recipeApi.get(`/recipes/favorites/fullget?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`)  
                    dispatch(onLoadRecipes(data))
                } else if(category === 'mis-recetas') {
                    const { data } = await recipeApi.get(`/recipes/myrecipes/get?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`)                                         
                    dispatch(onLoadRecipes(data))
                } else {
                    const { data } = await recipeApi.get(`/recipes/category/${category.replace(/-/g, ' ')}?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`)                                         
                    dispatch(onLoadRecipes(data))
                }
            } else if(search){
                const { data } = await recipeApi.get(`/recipes/search/${search}?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`)                    
                dispatch(onLoadRecipes(data))
            } else if(userid){
                const { data } = await recipeApi.get(`/recipes/profile/${userid}?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`)            
                dispatch(onLoadRecipes(data))        
            } else {
                const { data } = await recipeApi.get(`/recipes?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`)                    
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

                console.log('Error cargando receta')
                if (error instanceof AxiosError) {                    
                    if (error.response?.status === 404) {
                        console.log('La receta no existe')
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

export const startUpdatingRecipe = ( recipeData: FormRecipeData, id: string ) => {

    return async( dispatch: AppDispatch ) => {

        dispatch( setSaving() );

        try {

            if (typeof(recipeData.image)!=='string') {
                const fileUploadPromise = imageUpload( recipeData.image[0] as File )
                const pictureUrl = await Promise.resolve( fileUploadPromise );                 
                recipeData.image = pictureUrl
            }

            const { data } = await recipeApi.put(`/recipes/${id}`, recipeData)

            return data.updatedRecipe
            
        } catch (error) {
            console.log(error)
        }     

    }

}

export const startDeletingRecipe = ( id: string ) => {
    return async( dispatch: AppDispatch ) => {
        

        dispatch( setDeletingRecipe('deleting') );

        try {
            await recipeApi.delete(`/recipes/${id}`)
            await dispatch(onDeletingRecipe())     
            dispatch(setDeletingRecipe('idle'))
            
            
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
