import { Typography, CardMedia, Card, CardContent, CardActions, Button, Grid, Pagination, CardActionArea, IconButton, Rating, Divider } from '@mui/material';
import { NavBar } from '../components/NavBar'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { startLoadingRecipes } from '../store/recipe/thunks'
import { FavoriteBorderOutlined } from '@mui/icons-material'
import '@fontsource/roboto/400.css';
import { Link } from 'react-router-dom';


export const Home = () => {

  const dispatch = useAppDispatch()
  const { recipes } = useAppSelector( state => state.recipe )

 
  useEffect(() => {  
    dispatch( startLoadingRecipes() )
  }, [])
  

  return (
  <>
    <NavBar />
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
        
                

        {/* <Grid container item sx={{ justifyContent:'start', flexWrap:'wrap', my:2 }} columnSpacing={3} xs={10}> */}
        <Grid container item spacing={6} xs={10}>        
          {
            recipes?.map( recipe => (        
                
              <Grid key={ recipe._id } item xs={4}>
                <Card sx={{ width: '100%', height: 340 }}>
                  <Link to={`/recipes/${recipe._id}/${recipe.name.replace(/ /g, '-')}`} style={{ textDecoration:'none' }}>                  
                    <CardActionArea>
                      <CardMedia                      
                        sx={{ height: 140 }}
                        image={
                          (recipe.image === 'link de imagen')?
                          "https://www.littlepotatoes.com/wp-content/uploads/2023/01/Easy-Potatoes-4-Ways-Boiled-Potatoes-1-Ashley-Fehr-7-2017-Web-Res-1160x465.jpg"
                          : recipe.image
                        }
                        title={ recipe.name }                        
                      />
                      <CardContent>
                        <Grid height={115}>
                          <Typography color='#b50f0f' fontSize='1.1rem' fontWeight={500} fontFamily='helvetica'>
                            { recipe.category }
                          </Typography>
                          <Typography color='black' variant='h5' fontFamily='sans'>
                            { recipe.name }
                          </Typography>
                        </Grid>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                  <CardActions sx={{ justifyContent:'space-between', display:'flex' }}>
                    <Grid className='rating-grid' sx={{ display:'flex' }}>
                      <Rating readOnly value={3}/>
                      <Typography sx={{ cursor:'default', fontFamily:'sans-serif', color:'grey'}} >(5)</Typography>                
                    </Grid>
                    <IconButton><FavoriteBorderOutlined sx={{ fontSize:'30px' }} color='error'/></IconButton>
                  </CardActions>

                </Card>
              </Grid>
             ))
          }

    </Grid>

    <Grid sx={{ mb:2}} mt={4}>
      <Pagination count={10} color="primary"/>
    </Grid>
    </Grid>
    
  </>
  )
}
