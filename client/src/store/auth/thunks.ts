import { clearErrorMessage, onChecking, onLogin, onLogout } from './authSlice'
import { AppDispatch } from '../store';
import { FormAuthLoginData } from '../../pages/auth/Login';
import recipeApi from '../../api/recipeApi';
import { FormAuthRegisterData } from '../../pages/auth/Register';
import { AuthAxiosError } from '../../types';


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
            dispatch( onLogin({ name: data.name, uid: data.uid }) )
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
            // console.log(data.token)
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime().toLocaleString() )
            dispatch( onLogin({ name: data.name, uid: data.uid }) )
        } catch (error) {
            localStorage.clear()
            dispatch( onLogout(undefined) )
        }
    }
}

export const startLogout = () => {    

    return async( dispatch: AppDispatch) => {
        console.log('hola')
        localStorage.clear();
        dispatch(onLogout(undefined))

    }

}

