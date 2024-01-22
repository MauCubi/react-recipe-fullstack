import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { recipeSlice } from './recipe/recipeSlice';
import { categorySlice } from './category/categorySlice';
import { reviewSlice } from './review/reviewSlice';
import { userSlice } from './user/userSlice';


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    recipe: recipeSlice.reducer,
    category: categorySlice.reducer,
    review: reviewSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


