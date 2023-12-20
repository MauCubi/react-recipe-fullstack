import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';

export interface SliceAuth {
    status: string,
    user: User | undefined,
    errorMessage: string | undefined
}

const initialState: SliceAuth = {
    status: 'checking',
    user: undefined,
    errorMessage: undefined,
  }

export const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking'
            state.user = undefined
            state.errorMessage = undefined
        },
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated'
            state.user = payload
            state.errorMessage = undefined
        },
        onLogout: ( state , { payload }) => {
            state.status = 'not-authenticated'
            state.user = undefined
            state.errorMessage = payload
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = undefined
        }
    }
});


export const { 
    onChecking,
    onLogin,
    onLogout,
    clearErrorMessage
 } = authSlice.actions;