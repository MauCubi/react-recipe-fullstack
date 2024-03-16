import { Navigate, Route, Routes } from 'react-router-dom'
import { RecipeNotFound } from '../../pages/recipe/RecipeNotFound'
import { NavBar } from '../../components/NavBar'
import { RecipeCreate } from '../../pages/recipe/RecipeCreate'
import { RecipeShow } from '../../pages/recipe/RecipeShow'
// import { RecipeIndex } from '../../pages/recipe/RecipeIndex'
import { RecipeEdit } from '../../pages/recipe/RecipeEdit'
import { RecipeGridWrapper } from '../../components/recipes/RecipeGridWrapper'
import { Socials } from '../../components/Socials'


export const RecipeRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes >        

          <Route path=':id/:name' element={ <RecipeShow /> } />
          <Route path='agregar-receta' element={ <RecipeCreate /> } />
          <Route path='categoria/:category' element={ <RecipeGridWrapper /> } />          
          <Route path='editar/:id' element={ <RecipeEdit /> } />          
          <Route path='/*' element={ <Navigate to='/'/> } />
          <Route path='buscar/:search' element={ <RecipeGridWrapper /> } />
          <Route path='/404' element={ <RecipeNotFound /> } />        
          
      </Routes>             
      <Socials/>  
    </>
  )
}
