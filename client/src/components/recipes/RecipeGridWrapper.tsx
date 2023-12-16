import { Button, Divider, Grid, Pagination } from '@mui/material'
import { Link } from 'react-router-dom'
import { RecipeGrid } from './RecipeGrid'

export const RecipeGridWrapper = () => {
  return (
    <Grid display='flex' container justifyContent='center' alignItems='center' flexDirection='column' bgcolor='#e4f0ff66'>

    <Grid container item sx={{ justifyContent:'space-between', mt:4 }} xs={10}>       
      <Link to='/recipes/create'>
          <Button 
            variant='contained' 
            sx={{ 
              color:'white', 
              backgroundColor:'#6696c8', 
              textTransform:'none', 
              fontFamily:'sans-serif',
              fontWeight:'400'
            }}         
          >
            Agregar Una Receta
          </Button>        
      </Link>   

      <Button variant='contained'>Sort</Button>

      <Divider sx={{ width:'100%', my:3}} />
    </Grid>
    
            
    <Grid container item spacing={6} xs={10} sx={{ minHeight:'70vh' }}>

      <RecipeGrid />        
        
    </Grid>

    <Grid sx={{ mb:2}} mt={4}>
      <Pagination count={10} color="primary"/>
    </Grid>
</Grid>
  )
}
