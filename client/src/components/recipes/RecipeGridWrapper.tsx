import { Button, Divider, Grid, Pagination, Typography } from '@mui/material'
import {  useParams } from 'react-router-dom'
import { RecipeGrid } from './RecipeGrid'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { startLoadingRecipes } from '../../store/recipe/thunks'

export const RecipeGridWrapper = () => {

  const [page, setPage] = useState<number>(1)

  const dispatch = useAppDispatch()

  const { pagination } = useAppSelector( state => state.recipe)
  const { category, search } = useParams()

  useEffect(() => {     
    dispatch( startLoadingRecipes(category, page, search) )    
  }, [page, category])


  return (
    <Grid display='flex' container alignItems='center' flexDirection='column' bgcolor='#e4f0ff66' minHeight='100vh'>

    <Grid container item sx={{ justifyContent:'space-between', mt:4, alignItems:'center' }} xs={10}>       
      {
        (category)
        ?<Typography variant='h5' fontFamily='Hedvig Letters Serif'>{(category.charAt(0).toUpperCase() + category.slice(1)).replace(/-/g, ' ')}</Typography>
        :(search)
          ?<Typography variant='h5' fontFamily='Hedvig Letters Serif'>Busqueda: {search.replace(/-/g, ' ')}</Typography>
          :<Typography variant='h5' fontFamily='Hedvig Letters Serif'>Todas las recetas</Typography>
      }

      {/* <Link to='/recipes/create'>
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
      </Link>    */}

      <Button variant='contained'>Sort</Button>

      <Divider sx={{ width:'100%', mb:3, mt:1}} />
    </Grid>
    
            
    <Grid container item spacing={6} xs={10} sx={{ minHeight:'70vh' }}>

      <RecipeGrid />        
        
    </Grid>
    
    {
      (pagination?.count!==0)
      ?
      <Grid sx={{ mb:2}} mt={4}>
        <Pagination count={Math.ceil(pagination?.pageCount as number)} color="primary" page={page} onChange={ (event, pageNumber) => setPage(pageNumber)}/>
      </Grid>
      :''      
    }
</Grid>
  )
}
