import recipeApi from '../../api/recipeApi'
import { Category } from '../../types'
import { AppDispatch } from '../store'
import { onLoadCategories, onSelectCategory } from './categorySlice'



export const startLoadingCategories = () => {    

    return async( dispatch: AppDispatch ) => {         
            
            try {        

                const { data } = await recipeApi.get('/categories')       

                dispatch(onLoadCategories(data))   

            } catch (error) {
                console.log('Error cargando categorias')
                console.log(error);
            }

    }

}

export const startSelectCategory = (category: Category) => {    

    return async( dispatch: AppDispatch ) => {     
        
        dispatch(onSelectCategory(category))    
        

    }

}