import { createSlice } from '@reduxjs/toolkit';
import { ProfileUser } from '../../types';

export interface userSlice {
    userProfile: ProfileUser | null,
    userProfileStatus: 'idle' | 'loading'
    userSettingsStatus: 'idle' | 'saving' | 'savingcomplete'
    
}

const initialState: userSlice = {    
    userProfile: null,
    userProfileStatus:  'idle',
    userSettingsStatus: 'idle'
  }

export const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        onLoadUserProfile: ( state, { payload } ) => {            
            state.userProfile = payload
            state.userProfileStatus = 'idle'
        },
        onSavingUserSettings: (state) => {
            state.userSettingsStatus = 'savingcomplete'
            state.userSettingsStatus = 'idle'
        },
        setUserSettingsStatus: (state, { payload }) => {
            state.userSettingsStatus = payload
        },
        setUserProfileStatus: (state, { payload }) => {
            state.userProfileStatus = payload
        },
        
    }
})


export const {
    onLoadUserProfile,
    onSavingUserSettings,
    setUserSettingsStatus,
    setUserProfileStatus
} = userSlice.actions