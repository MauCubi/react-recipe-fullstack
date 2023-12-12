import axios, { AxiosRequestHeaders } from 'axios'
import { getEnvVariables } from '../helpers/getEnvVariables'


const { VITE_API_URL } = getEnvVariables()

interface CustomAxiosRequestHeaders extends AxiosRequestHeaders {
    'x-token': string;
  }

const recipeApi = axios.create({
    baseURL: VITE_API_URL
})


// TODO Configurar interceptores

recipeApi.interceptors.request.use( config => {    
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    } as CustomAxiosRequestHeaders

    return config
} )


export default recipeApi