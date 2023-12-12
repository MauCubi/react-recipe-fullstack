import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { recipeSlice } from './recipe/recipeSlice';


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    recipe: recipeSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


