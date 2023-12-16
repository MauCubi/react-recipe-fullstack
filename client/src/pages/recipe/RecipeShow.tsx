import { Avatar, Box, Button, Divider, Rating, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { startLoadingRecipe } from '../../store/recipe/thunks'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import '@fontsource/roboto/400.css';
import { AccessTime, FavoriteBorderOutlined } from '@mui/icons-material'

export const RecipeShow = () => {

  const {id, name} = useParams()
  const dispatch = useAppDispatch()

  const { activeRecipe, isLoadingRecipe } = useAppSelector( state => state.recipe )


  console.log(id, name)

  useEffect(() => {
    dispatch( startLoadingRecipe(id as string) )
  }, [])
  

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
          my:'62px',
          borderRadius:'10px',
          backgroundColor:'white',
          boxShadow:3,
          p:3 
        }}
      >      

    {
      (isLoadingRecipe)
      ?
        <Typography component='h5'>Cargando</Typography>
      :
        <>
        <Box className='recipe-top-section' component='div' sx={{ display:'flex' }}>

          <Box 
            className='recipe-top-image' 
            component='img' 
            src={activeRecipe?.image}
            sx={{ 
              height:'360px', 
              width:'470px',
              borderRadius:'15px' 
            }} 
          />
          
          <Box className='recipe-top-details' component='div' sx={{ display:'flex', flexDirection:'column', ml:'50px', height:'100%' }}>
            <Typography 
              className='recipe-top-category' 
              color='#b50f0f' 
              fontSize='1.1rem'             
              fontFamily='sans-serif' 
              fontWeight={600}
            >
              { activeRecipe?.category.name}
            </Typography>

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
              
              <Box className='recipe-top-review-info' component='div' sx={{ display:'flex', flexDirection:'row' }}>

                <Box className='rating-box' sx={{ display:'flex' }}>
                  <Rating readOnly value={3}/>             
                  <Typography sx={{ color:'grey'}}>(5)</Typography>                
                </Box>

                <Divider orientation='vertical' sx={{ height:'25px', mx:2}} />

                <Typography sx={{ color:'grey'}}>2 Comentarios</Typography>

                <Divider orientation='vertical' sx={{ height:'25px', mx:2}} />

                <Button 
                  startIcon={<FavoriteBorderOutlined/>} 
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
                >
                  Favorito
                </Button>              

              </Box>

            </Box>

            <Typography sx={{ fontFamily:'Hedvig Letters Serif', color:'black', fontSize:'1.125rem' }}>{ activeRecipe?.description}</Typography>

            <Box className='recipe-uploader-info' component='div' sx={{ display:'flex', flexDirection:'row', mt:2}}>
                <Typography sx={{ fontFamily:'Hedvig Letters Serif', fontSize:'.875rem'}}>Receta subida por</Typography>
                <Avatar sx={{ width: 20, height: 20, mx: 1 }} src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${activeRecipe?.user.name}&backgroundColor=ffd5dc`} />
                <Typography sx={{ fontFamily:'Hedvig Letters Serif', fontSize:'.875rem', fontWeight:600}}>{ activeRecipe?.user.name}</Typography>
            </Box>

            <Box className='recipe-bottom-info' component='div' sx={{ display:'flex', mt:'auto', flexDirection:'column' }}>
              <Box sx={{ display:'flex', color:'gray', mt:1}}>
                <AccessTime/>
                <Typography sx={{ ml:0.5 }}>
                  { activeRecipe?.cookTime.time} { activeRecipe?.cookTime.unit},
                </Typography>                
                <Typography sx={{ ml:0.5 }}>
                  { activeRecipe?.ingredients.length } Ingredientes,
                </Typography>                
                <Typography sx={{ ml:0.5 }}>
                  { activeRecipe?.steps.length } Pasos
                </Typography>                
                {/* <Typography component='h3'>{ activeRecipe?.ingredients.length}</Typography> */}
              </Box>
            </Box>

          </Box>

        </Box>

        <Divider sx={{ my:4 }}/>

        <Box className='recipe-ingredients' component='div' sx={{ display:'flex', flexDirection:'column', px:16 }}>

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

        <Box className='recipe-steps' component='div' sx={{ display:'flex', flexDirection:'column', px:16 }}>

          <Typography variant='h5' sx={{ fontFamily:'serif', fontWeight:600 }}>Pasos a seguir</Typography>

          <ul className='stepList'>
            {
              activeRecipe?.steps.map( (step, index) => (
                <Typography key={index} className='stepList-item' component='li' sx={{ fontFamily:'Hedvig Letters Serif', mb:'1rem' }} >{ step.name }</Typography>
              ) )
            }
          </ul>
        </Box>
          
        </>
    }     
    </Box>
    </Box>
  )
}
