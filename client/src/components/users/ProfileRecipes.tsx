import { Divider, Grid, Typography } from '@mui/material'
import { RecipeGrid } from '../recipes/RecipeGrid'

export const ProfileRecipes = () => {  

  
    return (
      <Grid display='flex' container alignItems='center' flexDirection='column' bgcolor='#e4f0ff66' minHeight='100vh'>
  
      <Grid container item sx={{ justifyContent:'space-between', alignItems:'center' }} xs={10}>       
        <Typography variant='h5' fontFamily='Hedvig Letters Serif'>Recetas del usuario</Typography>
   
        <Divider sx={{ width:'100%', mb:3, mt:1}} />
      </Grid>
      
              
      <Grid container item spacing={6} xs={10} sx={{ minHeight:'70vh' }}>
  
        <RecipeGrid />        
          
      </Grid>     

  </Grid>
  )
}
