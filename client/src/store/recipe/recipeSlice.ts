import { createSlice } from '@reduxjs/toolkit';
import { Pagination, Recipe } from '../../types';

export interface SliceRecipe {
    isLoadingRecipes: boolean,
    isLoadingRecipe: boolean,
    recipes: Recipe[] | null,
    activeRecipe: Recipe | null,
    isSaving: boolean,
    isEditing: boolean,
    messageSaved: string,
    favorites: string[] | null,
    pagination: Pagination | null,
    isLoadingSugestions: boolean,
    sugestions: Recipe[] | null
}

const initialState: SliceRecipe = {
    isLoadingRecipes: true,
    isLoadingRecipe: true,
    recipes: [],
    activeRecipe: null,
    isSaving: false,
    isEditing: false,
    messageSaved: '',
    favorites: [],
    pagination: { count: 0, pageCount: 0 },
    isLoadingSugestions: true,
    sugestions: []
  }

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,

    reducers: {
        onLoadRecipes: ( state, { payload = [] } ) => {                      
             
            state.recipes = []            
            const arrayRecipe: Recipe[] = payload.recipes    
            state.pagination = payload.pagination     

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
        },        
        setSaving: (state) => {
            state.isSaving = true
            state.messageSaved = ''
        },
        setCompleteSaving: (state) => {
            state.isSaving = false
            state.messageSaved = 'Receta Guardada'
        },
        setLoading:(state, { payload }) => {
            state.isLoadingRecipe = payload
            if (payload === true) {
                state.activeRecipe = null
            }
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
        },
        onUpdateReview:( state, { payload }) => {            
            
            if (state.activeRecipe?.rating) {
                state.activeRecipe.rating = payload
            }
        },
        setLoadingSugestions: (state, { payload }) => {
            state.isLoadingSugestions = payload
        },
        onLoadingSugestions: (state, { payload = []}) => {
            state.sugestions = []
            state.sugestions = payload.recipes
            state.isLoadingSugestions = false
        },
        setEditingRecipe: (state, { payload }) => {
            state.isEditing = payload
        },
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
    setLoadingSugestions,
    onLoadFavorites,
    onAddRemoveVaforite,
    onUpdateReview,
    onLoadingSugestions,
    setEditingRecipe
} = recipeSlice.actions