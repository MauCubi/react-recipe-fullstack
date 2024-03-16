import { Route, Routes } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { UserProfile } from '../../pages/user/UserProfile'
import { Socials } from '../../components/Socials'


export const UserRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes >    
          <Route path=':userid/:name' element={ <UserProfile /> } />       
      </Routes>           
      <Socials/>  
    </>
  )
}
