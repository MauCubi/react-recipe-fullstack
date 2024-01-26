import { Route, Routes } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { UserProfile } from '../../pages/user/UserProfile'


export const UserRoutes = () => {
  return (
    <>
    <NavBar />
    <Routes >       

        <Route path=':id/:name' element={ <UserProfile /> } />    
        
    </Routes>
  </>
  )
}
