import { Box } from '@mui/material'
// import { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { startLoadingRecipes } from '../../store/recipe/thunks'
// import { useAppDispatch } from '../../store/hooks'
import { RecipeGridWrapper } from '../../components/recipes/RecipeGridWrapper'


export const RecipeIndex = () => {

    // const dispatch = useAppDispatch()
    // const { category } = useParams()

    // useEffect(() => {
    //   dispatch(startLoadingRecipes(category))
    // }, [category])
    
    

  return (
    <Box>
        <RecipeGridWrapper />
    </Box>
  )
}
