import { NavBar } from '../components/NavBar'
import { useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'
import { startLoadingRecipes } from '../store/recipe/thunks'
import '@fontsource/roboto/400.css';
import { RecipeGridWrapper } from '../components/recipes/RecipeGridWrapper';


export const Home = () => {

  const dispatch = useAppDispatch()

 
  useEffect(() => {  
    dispatch( startLoadingRecipes() )
  }, [])
  

  return (
  <>
    <NavBar />
    <RecipeGridWrapper />    
  </>
  )
}
