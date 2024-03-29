import { Route, Routes } from 'react-router-dom'
import { Login } from '../../pages/auth/Login'
import { Register } from '../../pages/auth/Register'
import { Socials } from '../../components/Socials'

export const AuthRoutes = () => {
  return (
    <>
      <Routes>
          
          <Route path='login' element={ <Login /> } />
          <Route path='register' element={ <Register /> } />

      </Routes>           
      <Socials/>  
    </>
  )
}
