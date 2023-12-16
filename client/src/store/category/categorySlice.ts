import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../../types';

export interface SliceCategory {
    isLoadingCategories: boolean,
    categories: Category[],
    selectedCategory: Category | null
}


const initialState: SliceCategory = {
    isLoadingCategories: true,
    categories: [],
    selectedCategory: null
  }

export const categorySlice = createSlice({
    name: 'category',
    initialState,

    reducers: {
        onLoadCategories: ( state, { payload = [] } ) => {

            state.isLoadingCategories = false            
            const arrayCategories: Category[] = payload.categories       

            arrayCategories.forEach( category => {
                const exist = state.categories?.find( dbcategory => dbcategory._id === category._id )
                if (!exist) {
                    state.categories?.push( category );                    
                }       
                
            })
        },
        onSelectCategory: ( state, { payload } ) => {            
            state.selectedCategory = payload
        },
    }
})


export const {
    onLoadCategories,
    onSelectCategory
} = categorySlice.actions