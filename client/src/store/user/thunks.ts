import recipeApi from '../../api/recipeApi'
import { imageUpload } from '../../helpers/imageUpload'
import { SettingsFormData } from '../../pages/user/UserSettings'
import { AppDispatch } from '../store'
import { onLoadUserProfile, setUserSettingsStatus } from './userSlice'





export const startLoadingUserProfile = ( id: string ) => {    

    return async( dispatch: AppDispatch ) => {         
            
            try {        

                const { data } = await recipeApi.get(`/user/${id}`)       

                dispatch(onLoadUserProfile(data))   

            } catch (error) {
                console.log('Error cargando perfil de usuario')
                console.log(error);
            }
    }
}

export const startSavingUserSettings = ( settingsData: SettingsFormData, id: string ) => {    

    return async( dispatch: AppDispatch ) => {       
        
        dispatch(setUserSettingsStatus('saving'))

        try {        

            const fileUploadPromise = imageUpload( settingsData.avatar[0] as File )
            const pictureUrl = await Promise.resolve( fileUploadPromise ); 
            
            settingsData.avatar = pictureUrl

            await recipeApi.put(`/users/${id}`, settingsData)
            dispatch(setUserSettingsStatus('savingcomplete'))  
                

        } catch (error) {
            console.log('Error cargando categorias')
            console.log(error);
        }

    }

}