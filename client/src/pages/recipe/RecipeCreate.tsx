import { Box, Divider, Typography } from '@mui/material'
import '@fontsource/roboto/400.css';
import { RecipeForm } from '../../components/recipes/createUpdatePage/RecipeForm';

export const RecipeCreate = () => { 

  return (
      <Box component='div' sx={{ display:'flex', minHeight:'100vh', backgroundColor:'#e4f0ff66', justifyContent:'center'}}>    {
        
        <Box component='div' borderRadius='15px' sx={{ backgroundColor:'white', boxShadow:3, p:3, my:4, width:'70%', flexDirection:'row'}}>
            <Typography variant='h5' sx={{ color:'primary.light' }}>Agrega una Receta</Typography>             
            <Divider sx={{ my:2 }}/>

            <RecipeForm recipe={null} />

        </Box>
    
    }


    </Box>
  )
}
