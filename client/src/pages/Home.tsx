import { NavBar } from '../components/NavBar'
import '@fontsource/roboto/400.css';
// import { RecipeGridWrapper } from '../components/recipes/RecipeGridWrapper';
// import { RecipeIndex } from './recipe/RecipeIndex';
import { RecipeGridWrapper } from '../components/recipes/RecipeGridWrapper';
import { Socials } from '../components/Socials';


export const Home = () => {

  return (
  <>
    <NavBar />
    <RecipeGridWrapper />           
    <Socials/>  
    {/* <RecipeIndex />     */}
  </>
  )
}
