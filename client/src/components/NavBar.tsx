
import { Restaurant, AccountCircle } from '@mui/icons-material'
import { AppBar, Toolbar, Typography, styled, Button, ButtonProps, Avatar, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
// import LogoutIcon from '@mui/icons-material/Logout';
import { startLogout } from '../store/auth/thunks';
import { Link } from 'react-router-dom';


export const NavBar = () => {

  const navigate = useNavigate()  

  const { status, user } = useAppSelector( state => state.auth )
  const dispatch = useAppDispatch() 

  const Styledbox = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: 5    
  })

  const StyledButton = (props: ButtonProps) => (
    <Button       
      variant='outlined'      
      onClick={ () => navigate('/auth/login') }
      sx={{ 
        color:'white', 
        textTransform:'capitalize',
        borderRadius:2,
        px:1.5,
        fontSize: 14,
        borderColor:'white',
        ":hover":{
          backgroundColor:'primary.light',
          borderColor:'white'          
        } }}       
      
    >
      { props.children }
    </Button>
  )

  const StyledButton2 = (props: ButtonProps) => (
    <Button       
      onClick={ () => { dispatch(startLogout()) } }
      variant='outlined'      
      sx={{ 
        color:'white', 
        textTransform:'capitalize',
        borderRadius:1,
        px:1,
        fontSize: 14,
        // borderColor:'white',
        ":hover":{
          backgroundColor:'primary.light',
          borderColor:'white'          
        } }}       
      
    >
      { props.children }
    </Button>
  )


  return (
    <AppBar position='sticky' sx={{ backgroundColor:'primary' }}>
      <Toolbar sx={{ display:'flex', justifyContent:'space-between' }}>
        <Link to='/' style={{ textDecoration:'none' }}>
          <Box display='flex' sx={{ alignItems:'center', gap:1}}>
            <Restaurant sx={{ fontSize:{xs:16, sm:20}, color:'white' }}/>
            <Typography color='white' variant='h6' sx={{ display:{xs:'none', sm:'block'}}}> Recetitas</Typography>
          </Box>
        </Link>


        {
          (status === 'authenticated')
          ?            
            <Styledbox>
              <StyledButton2>            
              <Avatar sx={{ width: 27, height: 27, mr: 1 }} src='https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>   
                <Typography sx={{ fontFamily:'sans-serif' }}>
                  { user?.name } 
                </Typography>
              </StyledButton2>    
            </Styledbox>
          :
            <Styledbox>          
              <StyledButton>            
                <AccountCircle sx={{ color:'white', mr:1 }}/>            
                Ingresar
              </StyledButton>    
            </Styledbox>
        }
        

      </Toolbar>
    </AppBar>
  )
}
