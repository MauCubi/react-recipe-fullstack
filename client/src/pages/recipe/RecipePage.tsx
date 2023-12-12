import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { startLoadingRecipe } from '../../store/recipe/thunks'
import { useAppDispatch } from '../../store/hooks'

export const RecipePage = () => {

  const {id, name} = useParams()

  const dispatch = useAppDispatch()

  console.log(id, name)

  useEffect(() => {

    dispatch( startLoadingRecipe(id as string) )

  }, [])
  

  return (
    <Box sx={{ backgroundColor:'lightcyan' }}>        
        <Typography component='h3'>Recipes Pages</Typography>
    </Box>
  )
}
