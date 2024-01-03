import { NavBar } from '../components/NavBar'
import '@fontsource/roboto/400.css';
// import { RecipeGridWrapper } from '../components/recipes/RecipeGridWrapper';
import { RecipeIndex } from './recipe/RecipeIndex';


export const Home = () => {

  return (
  <>
    <NavBar />
    {/* <RecipeGridWrapper />     */}
    <RecipeIndex />    
  </>
  )
}
