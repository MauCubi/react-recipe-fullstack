import { Avatar, Box, Button, CircularProgress, Divider, IconButton, Rating, Typography } from '@mui/material'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { startAddRemoveFavorite, startDeletingRecipe, startLoadingRecipe } from '../../store/recipe/thunks'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import '@fontsource/roboto/400.css';
import { AccessTime, Delete, Edit, Favorite, FavoriteBorderOutlined } from '@mui/icons-material'
import { RecipeReviewForm } from '../../components/recipes/showPage/RecipeReviewForm'
import { RecipeReviewList } from '../../components/recipes/showPage/RecipeReviewList'
import { RecipeReviewTotal } from '../../components/recipes/showPage/RecipeReviewTotal'
import { startLoadingReviews, startLoadingUserReview } from '../../store/review/thunks'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


export const RecipeShow = () => {

  const {id} = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()


  const { activeRecipe, isLoadingRecipe, favorites, deletingStatus } = useAppSelector( state => state.recipe )
  const { status, user } = useAppSelector( state => state.auth )
  const { reviews, reviewsInfo } = useAppSelector( state => state.review)

   const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-left',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  })

  useEffect(() => {   
    
    dispatch( startLoadingRecipe(id as string) )
    dispatch( startLoadingReviews(id as string) )

    if (status === 'authenticated') {
      dispatch( startLoadingUserReview(id as string) )      
    }    

  }, [])


  useEffect(() => {
    if (deletingStatus==='completed') {
      Toast.fire({
        icon: 'success',
        title: 'Receta Eliminada'
      })      
      if (location.state?.from === 'create' || navigate.length <= 0) {
        navigate('/')
      } else {
        navigate(-1)
      }
    }
  }, [deletingStatus, navigate])
  

  const onDeleteRecipe = () => {
    
    Swal.fire({
        title: "¿Realmente quieres borrar la receta?",       
        showConfirmButton:false,     
        showCancelButton: true,
        showDenyButton: true,
        denyButtonText: 'Borrar',
        cancelButtonText: 'Cancelar',
        icon:'question'
        
      }).then((result) => {
        if (result.isDenied) {
            dispatch(startDeletingRecipe(activeRecipe?._id as string))                               
        }
      });    
}
  

  return (
    <Box 
      component='div' 
      sx={{ 
        display:'flex', 
        backgroundColor:'#e4f0ff66', 
        minHeight:'100vh',
        justifyContent:'center'
      }}
    >   

      <Box 
        className='recipe-info-box'
        component='div' 
        sx={{ 
          display:'flex', 
          width:'90%', 
          flexDirection:'column',
          my:{xs:'40px', sm:'62px'},
          borderRadius:'10px',
          backgroundColor:'white',
          boxShadow:3,
          p:3 
        }}
      >      

    {
      ((isLoadingRecipe === true) || (activeRecipe === null))
      ?
      <Box component='div' sx={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'50vh' }}>
        <CircularProgress sx={{ fontSize:'200px' }}/>
      </Box>
      :
        <>
        <Box className='recipe-top-section' component='div' sx={{ display:'flex', flexDirection:{xs:'column', sm:'row'} }}>

          <Box 
            className='recipe-top-image' 
            component='img' 
            src={activeRecipe?.image}
            sx={{ 
              height:'360px', 
              width:{xs:'385', sm:'470px'},
              borderRadius:'15px' 
            }} 
          />
          
          <Box className='recipe-top-details' component='div' 
            sx={{ 
              display:'flex', 
              flexDirection:'column', 
              ml:{xs:'0px',sm:'50px'}, 
              mt:{ xs:'20px', sm:'0px' }, 
              height:'100%',
              width:'100%' 
            }}
          >
            <Box display='flex' component='div' sx={{justifyContent:'space-between'}}>
              <Typography 
                className='recipe-top-category' 
                color='#b50f0f' 
                fontSize='1.1rem'             
                fontFamily='sans-serif' 
                fontWeight={600}
              >
                { activeRecipe?.category.name}
              </Typography>

              {
                (activeRecipe.user.name === user?.name)?
                  <Box display='flex' component='div' gap={1}>


                    <Link to={`/recetas/editar/${activeRecipe._id}`} style={{ textTransform:'none', textDecoration:'none' }}>
                      <Button startIcon={<Edit />} variant="contained" color="warning" size='small' sx={{ display:{xs:'none', sm:'flex'}, textTransform:'none' }}>
                        Editar
                      </Button>
                      <IconButton 
                          size='small' 
                          color='warning' 
                          sx={{ 
                              display:{xs:'flex', sm:'none'}                                  
                          }}
                      >
                        <Edit />
                      </IconButton>
                    </Link>

                    <IconButton 
                        size='small'  
                        color='error'
                        sx={{ 
                            display:{xs:'flex', sm:'none'}                                  
                        }}
                        onClick={ onDeleteRecipe }
                    >
                        <Delete />
                    </IconButton>

                    <Button startIcon={<Delete/>} variant="contained" color="error" size='small' onClick={ onDeleteRecipe } sx={{ display:{xs:'none', sm:'flex'}, textTransform:'none'  }}>
                      Borrar
                    </Button>

                  </Box>
                :''
              }


            </Box>


            
            <Typography 
              className='recipe-top-recipename' 
              component='h3' 
              sx={{ 
                fontSize:'40px', 
                fontFamily:'serif', 
                color:'black',
                lineHeight:1.1, 
                fontWeight:600
              }}
            >
              { activeRecipe?.name}
            </Typography>

            <Box 
              className='recipe-top-info' 
              component='div' 
              sx={{ 
                display:'flex', 
                flexDirection:'row',
                my:2                
              }}
            >
              
              <Box className='recipe-top-review-info' component='div' sx={{ display:'flex', flexDirection:{xs:'column', sm:'row'} }}>

                <Box className='rating-box' sx={{ display:'flex', cursor:'pointer', textDecoration:'none' }} href='#reviews' component='a'>
                  {
                    (activeRecipe?.rating !== 0)
                    ?<>
                      <Rating readOnly precision={0.5} value={ (activeRecipe?.rating === undefined) ? 0 : activeRecipe?.rating }/>             
                      <Typography sx={{ color:'grey', textDecoration:'none'}}>({ reviewsInfo.num })</Typography>                
                    </>
                    : <Typography sx={{ color:'grey'}}>Sin reseñas</Typography>
                  }
                </Box>
                
                <Divider orientation='vertical' sx={{ display:{xs:'none', sm:'block'}, height:'25px', mx:2}} />

                <Box component='div' sx={{ display:'flex', flexDirection:'row', alignContent:'center', alignItems:'center', mt:{xs:'8px', sm:'0px'} }}>

                  <Typography sx={{ color:'grey'}}>{ reviews.filter( x => x.comment !== '' ).length } Comentarios</Typography>


                  <Divider orientation='vertical' sx={{ isplay:{xs:'none', sm:'block'}, height:'25px', mx:2}} />

                  <Button 
                    startIcon={
                      (favorites?.includes(activeRecipe?._id as string))
                      ?<Favorite/>
                      :<FavoriteBorderOutlined/>
                    } 
                    disableRipple
                    sx={{ 
                      p:0, 
                      textTransform:'none', 
                      fontFamily:'sans-serif',
                      color:'error.main',
                      ":hover":{
                        backgroundColor:'inherit',
                        color:'error.light'
                      }
                    }}
                    onClick={ () => { 
                      if (status === 'authenticated') {
                        dispatch(startAddRemoveFavorite(activeRecipe?._id as string))                           
                      } else {
                        Swal.fire({
                          title: "Debes iniciar sesion para agregar favoritos!",
                          icon:'info'                            
                        })
                      }
                    }}
                  >
                    Favorito
                  </Button>              
                </Box>



              </Box>

            </Box>

            <Typography sx={{ fontFamily:'Hedvig Letters Serif', color:'black', fontSize:'1.125rem' }}>{ activeRecipe?.description}</Typography>

            <Box className='recipe-uploader-info' component='div' sx={{ display:'flex', flexDirection:'row', mt:2}}>
                <Typography sx={{ fontFamily:'Hedvig Letters Serif', fontSize:'.875rem'}}>Subida por</Typography>

                <Link to={`/usuario/${activeRecipe.user._id}/${activeRecipe.user.name.replace(/ /g, '-')}`} style={{ textDecoration:'none'}}>     
                  <Box component='div'sx={{ display:'flex', flexDirection:'row', overflow: "hidden"  }}>
                    <Avatar sx={{ width: 20, height: 20, mx: 1 }} src={activeRecipe.user.avatar} />
                    <Typography noWrap sx={{ fontFamily:'Hedvig Letters Serif', fontSize:'.875rem', fontWeight:600, color:'black', textOverflow: "ellipsis",width:{xs:'9rem', sm:'auto'} }}>
                      { activeRecipe?.user.name}
                    </Typography>
                  </Box>             
                </Link>

            </Box>

            <Box className='recipe-bottom-info' component='div' sx={{ display:'flex', mt:'auto', flexDirection:'column' }}>
              <Box sx={{ display:'flex', color:'gray', mt:1, alignItems:'center'}}>
                <AccessTime/>
                <Typography sx={{ fontSize:'0.800rem', ml:0.5 }}>
                  { activeRecipe?.cookTime.time} { activeRecipe?.cookTime.unit},
                </Typography>                
                <Typography sx={{ fontSize:'0.800rem', ml:0.5 }}>
                  { activeRecipe?.ingredients.length } Ingredientes,
                </Typography>                
                <Typography sx={{ fontSize:'0.800rem', ml:0.5 }}>
                  { activeRecipe?.steps.length } Pasos
                </Typography>                
              </Box>
            </Box>

          </Box>

        </Box>

        <Divider sx={{ my:4 }}/>

        <Box className='recipe-ingredients' component='div' sx={{ display:'flex', flexDirection:'column', px:{xs:0, sm:16} }}>

          <Typography variant='h5' sx={{ fontFamily:'serif', fontWeight:600 }}>Ingredientes</Typography>

          <ul className='ingredientsList'>
            {
              activeRecipe?.ingredients.map( (ingredient, index) => (
                
                <Box className='ingredientList-item' component='li' key={index} sx={{ lineHeight:'2.125rem' }}>
                  <Typography component='span' sx={{ fontFamily:'Hedvig Letters Serif' }}>{ (ingredient.unit !== 'A gusto')? ingredient.quantity : '' }  </Typography>
                  <Typography component='span' sx={{ fontFamily:'Hedvig Letters Serif' }}>{ ingredient.unit } de</Typography>
                  <Typography component='span' sx={{ fontFamily:'Hedvig Letters Serif', fontWeight:600 }}> { ingredient.name }</Typography>
                </Box>
                
              ) )
            }
          </ul>

        </Box>

        <Box className='recipe-steps' component='div' sx={{ display:'flex', flexDirection:'column', px:{xs:0, sm:16} }}>

          <Typography variant='h5' sx={{ fontFamily:'serif', fontWeight:600 }}>Pasos a seguir</Typography>

          <ul className='stepList'>
            {
              activeRecipe?.steps.map( (step, index) => (
                <Typography key={index} className='stepList-item' component='li' sx={{ fontFamily:'Hedvig Letters Serif', mb:'1rem' }} >{ step.name }</Typography>
              ) )
            }
          </ul>
        </Box>

        <Divider sx={{ my:2 }}/>

        <Box className='recipe-reviews' id='reviews' component='div' sx={{ display:'flex', flexDirection:'column', px:{xs:0, sm:16} }}>

          <Box className='review-rating-box' sx={{ display:'flex', alignItems:'center', mb:2 }}>
            <Typography variant='h5' sx={{ fontFamily:'serif', fontWeight:600 }}>Reseñas           
              {/* <Typography component='span' sx={{ fontFamily:'serif', ml:0.5 }}>(5)</Typography>                 */}
            </Typography> 
            {/* <Rating readOnly value={3} sx={{ ml:1.2 }}/>              */}
          </Box>

            {
              ( status === 'authenticated' && user?.name !== activeRecipe?.user.name)
              ?<RecipeReviewForm />
              :''
            }

            <RecipeReviewTotal />

            {
              ((reviews.filter( x => x.comment !== '').length) !== 0)
              ?<RecipeReviewList />
              :''
              
            }


            

          </Box>

        
          
        </>
    }     
    </Box>
    </Box>
  )
}
