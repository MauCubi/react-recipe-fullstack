import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';

export interface userSlice {
    userProfile: User | null,
    userSettingsStatus: 'idle' | 'saving' | 'savingcomplete'
    
}


const initialState: userSlice = {    
    userProfile: null,
    userSettingsStatus: 'idle'
  }

export const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        onLoadUserProfile: ( state, { payload } ) => {            
            state.userProfile = payload
        },
        onSavingUserSettings: (state) => {
            state.userSettingsStatus = 'savingcomplete'
            state.userSettingsStatus = 'idle'
        },
        setUserSettingsStatus: (state, { payload }) => {
            state.userSettingsStatus = payload
        },
        
    }
})


export const {
    onLoadUserProfile,
    onSavingUserSettings,
    setUserSettingsStatus
} = userSlice.actions