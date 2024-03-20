import { Box, CircularProgress, Divider, Typography, styled } from '@mui/material'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useParams } from 'react-router-dom'
import { startLoadingUserProfile } from '../../store/user/thunks'
import { RecipeGridWrapper } from '../../components/recipes/RecipeGridWrapper'

export const UserProfile = () => {


  const dispatch = useAppDispatch()
  const { userid } = useParams()
  const { userProfile, userProfileStatus } = useAppSelector( state => state.user)


  useEffect(() => {
    dispatch(startLoadingUserProfile(userid as string))
  }, [dispatch, userid])  

  const CountText = styled(Typography)({
    fontFamily:'Hedvig Letters Serif', 
    fontWeight:600, 
    minWidth:'30px',
    textAlign:'right', 
    marginRight:'6px'
  })


  return (
    <>
      <Box 
        component='div' 
        sx={{ 
          display:'flex', 
          backgroundColor:'#e4f0ff66',
          justifyContent:'center'          
        }}
      >
        <Box
          component='div' 
          sx={{ 
            display:'flex',             
            width:{xs:'90%', sm:'70%'}, 
            height:{xs:'auto',sm:'300px'},
            flexDirection:{xs:'column', sm:'row'},
            mt:'42px',
            borderRadius:'10px',
            backgroundColor:'white',
            boxShadow:3,
            p:3 
          }}
        >

          {
            (userProfileStatus==='idle')?
          <>         
            <Box component='div' sx={{ display:'flex', flexDirection:'column', justifyContent:'center', mx:6, alignItems:'center', width:{xs:'auto', sm:'20%'} }}>                                                                            
              <Box
                component='img'                                          
                src={ userProfile?.avatar }
                sx={{ 
                  width:'160px', height:'160px',
                  borderRadius:'50%',
                  }}                                                    
              />           
              <Typography sx={{ fontSize:'1.2rem', fontFamily:'sans-serif', fontWeight:600}}>{ userProfile?.name }</Typography>                                    
            </Box>

            <Box component='div' sx={{ display:'flex', my:{xs:'1rem', sm:'0rem'} }}>
              <Divider orientation='vertical' sx={{ height:'100%', width:'100%', display:{xs:'none', sm:'flex'} }}/>
              <Divider orientation='horizontal' sx={{ height:'100%', width:'100%', display:{xs:'flex', sm:'none'} }}/>
            </Box>

            <Box component='div' sx={{ display:'flex', flexDirection:'column', justifyContent:'center', gap:1.5, mx:{xs:0, sm:6} }}>

              <Box component='div' sx={{ display:'flex', flexDirection:'row'}}>
                <CountText>{ userProfile?.recipesCount }</CountText>
                <Typography sx={{ fontFamily:'Hedvig Letters Serif'}}>Total de recetas</Typography>
              </Box>

              <Box component='div' sx={{ display:'flex', flexDirection:'row'}}>
                <CountText>{ userProfile?.favoritesCount}</CountText>
                <Typography sx={{ fontFamily:'Hedvig Letters Serif'}}>Recetas Favoritas</Typography>
              </Box>

              <Box component='div' sx={{ display:'flex', flexDirection:'row'}}>
                <CountText>{ userProfile?.reviewsCount}</CountText>
                <Typography sx={{ fontFamily:'Hedvig Letters Serif'}}>Total de reseñas</Typography>
              </Box>

              <Box component='div' sx={{ display:'flex', flexDirection:'row'}}>
                <CountText>{ userProfile?.commentsCount}</CountText>
                <Typography sx={{ fontFamily:'Hedvig Letters Serif'}}>Total de comentarios</Typography>
              </Box>

            </Box>
          
          </>
          :
          <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>
            <CircularProgress size='60px'/>
          </Box>
        }
          

        </Box>
      </Box>
      
      <RecipeGridWrapper />
    </>
  )
}
