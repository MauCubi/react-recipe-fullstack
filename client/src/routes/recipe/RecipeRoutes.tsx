import { Navigate, Route, Routes } from 'react-router-dom'
import { RecipeNotFound } from '../../pages/recipe/RecipeNotFound'
import { NavBar } from '../../components/NavBar'
import { RecipeCreate } from '../../pages/recipe/RecipeCreate'
import { RecipeShow } from '../../pages/recipe/RecipeShow'


export const RecipeRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes >        
          <Route path=':id/:name' element={ <RecipeShow /> } />
          <Route path='create' element={ <RecipeCreate /> } />
          <Route path='/*' element={ <Navigate to='/'/> } />
          <Route path='/404' element={ <RecipeNotFound /> } />        
      </Routes>
    </>
  )
}
