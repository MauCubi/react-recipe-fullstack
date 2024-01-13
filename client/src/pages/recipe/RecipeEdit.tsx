import { Box, CircularProgress, Divider, Typography } from '@mui/material'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { startLoadingRecipe } from '../../store/recipe/thunks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RecipeForm } from '../../components/recipes/createUpdatePage/RecipeForm';


export const RecipeEdit = () => {    

    const { id } = useParams()
    const { activeRecipe } = useAppSelector( state => state.recipe)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(startLoadingRecipe(id as string))
    }, [])


  return (
    <Box component='div' sx={{ display:'flex', minHeight:'100vh', backgroundColor:'#e4f0ff66', justifyContent:'center'}}>   
        
        <Box component='div' borderRadius='15px' sx={{ backgroundColor:'white', boxShadow:3, p:3, my:4, width:'70%', flexDirection:'row'}}>

            <Typography variant='h5' sx={{ color:'primary.light' }}>Editar Receta</Typography>                                 
            <Divider sx={{ my:2 }}/>
            {
                (activeRecipe!==null && activeRecipe._id === id)
                ?
                    <RecipeForm recipe={activeRecipe} />
                :
                    <Box component='div' sx={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'50vh' }}>
                        <CircularProgress sx={{ fontSize:'200px' }}/>
                    </Box>
            }                   
        
        </Box>

    </Box>
  )
}
