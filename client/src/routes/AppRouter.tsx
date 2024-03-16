import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/Home'
import { AuthRoutes } from './auth/AuthRoutes'
// import { RecipeRoutes } from './recipe/RecipeRoutes'
import { checkAuthToken } from '../store/auth/thunks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from 'react';
import { RecipeRoutes } from './recipe/RecipeRoutes';
import { UserSettings } from '../pages/user/UserSettings';
import { UserRoutes } from './user/UserRoutes';


export const AppRouter = () => {  

  const dispatch = useAppDispatch() 
  const { status } = useAppSelector( state => state.auth )

  useEffect(() => {
    dispatch(checkAuthToken())
  }, [])

  if (status === 'checking') {
    return (
      <h3></h3>
    )
  }
  

  return (    
    <Routes>

        <Route path='/' element={ <Home /> } />
        <Route path='/*' element={ <Navigate to='/'/> } />      
        <Route path='/recetas/*' element={ <RecipeRoutes /> } />    


        <Route path='/usuario/*' element={ <UserRoutes /> } />       

             

        {
          ( status === 'not-authenticated' )
          ?(
            <>
              <Route path='/auth/*' element={ <AuthRoutes /> }/>                
            </>
          ):(
            <>
              <Route path='/auth/*' element={ <Navigate to='/'/> }/>
              <Route path='/configuracion' element={ <UserSettings /> } />  
            </>
          )
        }
        

        
    </Routes>   
  )
}
