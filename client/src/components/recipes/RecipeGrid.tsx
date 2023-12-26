import { Typography, CardMedia, Card, CardContent, CardActions, Grid, CardActionArea, IconButton, Rating } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Link } from 'react-router-dom'
import { Favorite, FavoriteBorderOutlined } from '@mui/icons-material';
import { startAddRemoveFavorite } from '../../store/recipe/thunks';


export const RecipeGrid = () => {


    const { recipes, isLoadingRecipes, favorites } = useAppSelector( state => state.recipe )
    const { status } = useAppSelector( state => state.auth )
    const dispatch = useAppDispatch()


  return (
    <>
    {     
            (!isLoadingRecipes)?       
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
                            { recipe.category.name }
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
                      {
                        (recipe.rating !== 0)
                        ?<Rating readOnly value={recipe.rating} precision={0.25}/>
                        :''
                      }
                      {/* <Rating readOnly value={recipe.rating} precision={0.25}/> */}
                      {/* <Typography sx={{ cursor:'default', fontFamily:'sans-serif', color:'grey'}} >{recipe.rating}</Typography>                 */}
                    </Grid>

                    <IconButton 
                      onClick={ () => { 
                        if (status === 'authenticated') {
                          dispatch(startAddRemoveFavorite(recipe._id))                           
                        } else {
                          alert('Tenes que iniciar sesion!')
                        }
                      }}
                    >
                      {
                        (favorites?.includes(recipe._id))
                        ?<Favorite sx={{ fontSize:'30px', color:'error.light' }} />
                        :<FavoriteBorderOutlined sx={{ fontSize:'30px', color:'error.light' }} color='error'/>
                      }
                      {/* <FavoriteBorderOutlined sx={{ fontSize:'30px' }} color='error'/> */}
                    </IconButton>

                  </CardActions>

                </Card>
              </Grid>
             ))
             :''
          }       
    
    </>
  )
}
