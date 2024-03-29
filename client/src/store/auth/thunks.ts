import { clearErrorMessage, onChecking, onLogin, onLogout, setAvatar } from './authSlice'
import { AppDispatch } from '../store';
import { FormAuthLoginData } from '../../pages/auth/Login';
import recipeApi from '../../api/recipeApi';
import { FormAuthRegisterData } from '../../pages/auth/Register';
import { AuthAxiosError } from '../../types';
import { startLoadingFavorites } from '../recipe/thunks';


// export const checkingAuthentication = ( email, password ) => {       
//     return async( dispatch: AppDispatch ) => {        
//         dispatch( onChecking() )
//     }
// } 



export const startLogin = ({ email, password }: FormAuthLoginData) => {    
    
    return async( dispatch: AppDispatch ) => { 
        dispatch( onChecking() )        
        try {
            const { data } = await recipeApi.post('/auth', { email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime().toLocaleString() )            
            await dispatch( onLogin({ name: data.name, uid: data.uid }) )  
            await dispatch( setAvatar({avatar: data.avatar}))  
            dispatch( startLoadingFavorites() )        
            
        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas'))
            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 10)
        }
    }

}


export const startRegister = ({ name, email, password }: FormAuthRegisterData) => {    
    
    return async( dispatch: AppDispatch ) => { 
        dispatch( onChecking() )        
        try {
            const { data } = await recipeApi.post('/auth/register', { name, email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime().toLocaleString() )
            dispatch( onLogin({ name: data.name, uid: data.uid }) )
            await dispatch( setAvatar({avatar: data.avatar})) 
        } catch (error) {
            const err = error as AuthAxiosError            
            console.log(err.response?.data.msg)
            dispatch( onLogout(err.response?.data.msg))
            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 10)
        }
    }

}


export const checkAuthToken = () => {

    return async( dispatch: AppDispatch ) => { 
        
              
        const token = localStorage.getItem('token')
        if (!token) {
            return dispatch( onLogout('Token Expiró') )
        }

        try {
            const { data } = await recipeApi.get('auth/renew')
            console.log(data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime().toLocaleString() )
            await dispatch( onLogin({ name: data.name, uid: data.uid }) )    
            await dispatch( setAvatar({ avatar: data.avatar}))
            dispatch( startLoadingFavorites() )        
        } catch (error) {
            localStorage.clear()
            dispatch( onLogout(undefined) )
        }
    }
}

export const startLogout = () => {        

    return async( dispatch: AppDispatch) => { 

        localStorage.clear()
        dispatch(onLogout(undefined))       
        window.location.reload()

    }

}

