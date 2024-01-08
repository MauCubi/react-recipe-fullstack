import { Box, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Pagination, Select, Typography } from '@mui/material'
import {  useParams } from 'react-router-dom'
import { RecipeGrid } from './RecipeGrid'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { startLoadingRecipes } from '../../store/recipe/thunks'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'

export const RecipeGridWrapper = () => {

  const [page, setPage] = useState<number>(1)
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')

  const dispatch = useAppDispatch()

  const { pagination } = useAppSelector( state => state.recipe)
  const { category, search } = useParams()

  const handleSortOrder = () => {

    if (sortOrder !== 'desc') {
      setSortOrder('desc')
    } else {
      setSortOrder('asc')
    }

  }

  useEffect(() => {     
    dispatch( startLoadingRecipes(sortBy, sortOrder, category, page, search) )    
  }, [page, category, sortBy, sortOrder])


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

      <Box component='div' sx={{ display:'flex', width:'auto' }}>
        {/* <Button variant='contained'>Sort</Button> */}
        <FormControl>
          <InputLabel id="sort-label">Ordenar Por</InputLabel>
          <Select 
            size='small' 
            labelId='sort-label' 
            label='Ordenar Por' 
            value={sortBy}
            MenuProps={{disableScrollLock:true}}
            sx={{
              fontSize:'14px',
              width:'9rem'
            }}
            onChange={ (e) => setSortBy(e.target.value) }
          >
            <MenuItem value='createdAt'>Mas nueva</MenuItem>
            <MenuItem value='rating' >Mejor rating</MenuItem>
          </Select>
        </FormControl>
        <IconButton sx={{ fontSize:'14px'}} disableRipple onClick={ handleSortOrder }>
          {
            (sortOrder !== 'asc')
            ?
            <>
              Descendente
              <ArrowDropDown/>
            </>
            :
            <>
              Ascendente
              <ArrowDropUp/>
            </>
          }
        </IconButton>
       
      </Box>

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
