import { createSlice } from '@reduxjs/toolkit';
import { Recipe } from '../../types';

export interface SliceRecipe {
    isLoadingRecipes: boolean,
    isLoadingRecipe: boolean
    recipes: Recipe[] | null,
    activeRecipe: Recipe | null,
    isSaving: boolean,
    messageSaved: string,
    favorites: string[] | null
}

const initialState: SliceRecipe = {
    isLoadingRecipes: true,
    isLoadingRecipe: true,
    recipes: [],
    activeRecipe: null,
    isSaving: false,
    messageSaved: '',
    favorites: []
  }

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,

    reducers: {
        onLoadRecipes: ( state, { payload = [] } ) => {
                      
            state.recipes = []            
            const arrayRecipe: Recipe[] = payload.recipes           

            arrayRecipe.forEach( recipe => {
                const exist = state.recipes?.find( dbrecipe => dbrecipe._id === recipe._id )
                if (!exist) {
                    state.recipes?.push( recipe );                    
                }                
            });
            
            state.isLoadingRecipes = false   

        },
        onLoadRecipesByCategory: ( state, { payload = [] } ) => {
            
            state.recipes = []            
            const arrayRecipe: Recipe[] = payload.recipes           
            
            arrayRecipe.forEach( recipe => {
                const exist = state.recipes?.find( dbrecipe => dbrecipe._id === recipe._id )
                if (!exist) {
                    state.recipes?.push( recipe );                    
                }       
                
            });
            state.isLoadingRecipes = false    

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
        },
        setLoadingRecipes:(state, { payload }) => {
            state.isLoadingRecipes = payload
        },
        onLoadFavorites:( state, { payload = [] }) => {

            state.favorites = []
            const favoritesArray: { recipe: string }[] = payload.favorites

            favoritesArray.map( favorite => (
                state.favorites?.push( favorite.recipe )
            ))
        },
        onAddRemoveVaforite:(state, { payload }) => {
            
            if (state.favorites?.includes(payload)) {
                const index = state.favorites.indexOf(payload, 0);
                state.favorites.splice(index, 1)
            } else {
                state.favorites?.push(payload)
            }
        }
    }
});


export const {
    onLoadRecipes,
    onLoadRecipesByCategory,
    onLoadRecipe,
    setSaving,
    setCompleteSaving,
    setLoading,
    setLoadingRecipes,
    onLoadFavorites,
    onAddRemoveVaforite
} = recipeSlice.actions