import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useParams } from 'react-router-dom'
import { startLoadingUserProfile } from '../../store/user/thunks'
import { RecipeGridWrapper } from '../../components/recipes/RecipeGridWrapper'

export const UserProfile = () => {


  const dispatch = useAppDispatch()
  const { userid } = useParams()
  const { userProfile } = useAppSelector( state => state.user)


  useEffect(() => {
    dispatch(startLoadingUserProfile(userid as string))
  }, [dispatch, userid])  


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
            width:'80%', 
            height:'300px',
            flexDirection:'column',
            mt:'42px',
            borderRadius:'10px',
            backgroundColor:'white',
            boxShadow:3,
            p:3 
          }}
        >
          <Typography>{userProfile?.recipesCount}</Typography>
        </Box>
      </Box>
      
      <RecipeGridWrapper />
    </>
  )
}
