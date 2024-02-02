import { Box, CircularProgress, Divider, Typography } from '@mui/material'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { startLoadingRecipe } from '../../store/recipe/thunks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RecipeForm } from '../../components/recipes/createUpdatePage/RecipeForm';
import { DoDisturb } from '@mui/icons-material';


export const RecipeEdit = () => {    

    const { id } = useParams()
    const { activeRecipe } = useAppSelector( state => state.recipe)
    const { user } = useAppSelector( state => state.auth)
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
                    (activeRecipe.user._id === user?.uid)
                    ?
                        <RecipeForm recipe={activeRecipe} />
                    : 
                    <Box component='div' sx={{ display:'flex', flexDirection:'column', mt:10 }}>
                        <DoDisturb sx={{ alignSelf:'center', fontSize:'100px', color:'red' }} />
                        <Typography variant='h3' sx={{ textAlign:'center'}}>NO PUEDE EDITAR ESTA RECETA</Typography>
                    </Box>

                :
                    <Box component='div' sx={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'50vh' }}>
                        <CircularProgress sx={{ fontSize:'200px' }}/>
                    </Box>
            }                   
        
        </Box>

    </Box>
  )
}
