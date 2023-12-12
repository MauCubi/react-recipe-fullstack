import { createSlice } from '@reduxjs/toolkit';
import { Recipe } from '../../types';

export interface SliceRecipe {
    isLoadingRecipes: boolean,
    recipes: Recipe[] | null,
    activeRecipe: Recipe | null,
    isSaving: boolean,
    messageSaved: string,
    isLoadingRecipe: boolean
}


const initialState: SliceRecipe = {
    isLoadingRecipes: true,
    recipes: [],
    activeRecipe: null,
    isSaving: false,
    messageSaved: '',
    isLoadingRecipe: true
  }

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,

    reducers: {
        onLoadRecipes: ( state, { payload = [] } ) => {

            state.isLoadingRecipes = false            
            const arrayRecipe: Recipe[] = payload.recipes           

            arrayRecipe.forEach( recipe => {
                const exist = state.recipes?.find( dbrecipe => dbrecipe._id === recipe._id )
                if (!exist) {
                    state.recipes?.push( recipe );                    
                }       
                
            });
        },
        onLoadRecipe: ( state, { payload } ) => {            
            state.activeRecipe = payload
            state.isLoadingRecipe = false
        },        
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        setCompleteSaving: (state) => {
            state.isSaving = false;
            state.messageSaved = 'Receta Guardada';
        },
        setLoading:(state, { payload }) => {
            state.isLoadingRecipe = payload
        }
    }
});


export const {
    onLoadRecipes,
    onLoadRecipe,
    setSaving,
    setCompleteSaving,
    setLoading  
} = recipeSlice.actions