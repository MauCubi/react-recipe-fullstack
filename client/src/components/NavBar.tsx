
import { Restaurant, AccountCircle, Menu } from '@mui/icons-material'
import { AppBar, Toolbar, Typography, styled, Button, ButtonProps, Avatar, Box, IconButton, Divider, List, ListItem, ListItemButton, Drawer } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
// import LogoutIcon from '@mui/icons-material/Logout';
import { startLogout } from '../store/auth/thunks';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { startLoadingCategories } from '../store/category/thunks';



export const NavBar = () => {

  const navigate = useNavigate()  

  const { status, user } = useAppSelector( state => state.auth )
  const dispatch = useAppDispatch() 

  const { categories } = useAppSelector( state => state.category )

  

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

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    console.log(mobileOpen)
  };

  useEffect(() => {
    dispatch(startLoadingCategories())
  }, [])
  

  return (
    <>
      <AppBar position='sticky' sx={{ backgroundColor:'primary' }}>
        <Toolbar sx={{ display:'flex', justifyContent:'space-between' }}>
          <Box display='flex' sx={{ alignItems:'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={ handleDrawerToggle }
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Link to='/' style={{ textDecoration:'none' }}>
              <Box display='flex' sx={{ alignItems:'center', gap:1}}>
                <Restaurant sx={{ fontSize:{xs:16, sm:20}, color:'white' }}/>
                <Typography color='white' variant='h6' sx={{ fontFamily:'Hedvig Letters Serif', display:{xs:'none', sm:'block'}}}> Recetitas</Typography>
              </Box>
            </Link>
          </Box>


          {
            (status === 'authenticated')
            ?            
              <Styledbox>
                <StyledButton2>            
                <Avatar sx={{ width: 27, height: 27, mr: 1 }} src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}&backgroundColor=ffd5dc`}/>   
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


      <Box component='nav' sx={{ width: { sm: 240 }, flexShrink: { sm:0 } }}>
        <Drawer
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}

            ModalProps={{
              keepMounted: true,
            }}

            PaperProps={{
              sx:{
                backgroundColor:'#f1f7ff',
              }
            }}
            sx={{
                display:{ xs:'block' },
                ' & .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }                
            }}
        >
            <Toolbar />

            <Divider />

            <List>
                  {
                    categories?.map( category => (
                      <ListItem key={ category._id } disablePadding>
                        <ListItemButton 
                          component={Link} 
                          to={`/recipes/${category.name.toLowerCase()}`}                       
                          sx={{ 
                            textAlign: 'center', 
                            py:0.5  
                          }} 
                          onClick={ handleDrawerToggle }>
                          <Typography sx={{ fontFamily:'Hedvig Letters Serif', fontSize:'15px', fontWeight:600, color:'black', textDecoration:'none' }}>{ category.name }</Typography>
                        </ListItemButton>
                      </ListItem>
                    ))
                  }
            </List>

            <Divider />

            <List>
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center', py:0.5 }}>
                  <Typography sx={{ fontFamily:'Hedvig Letters Serif', fontSize:'15px', fontWeight:600 }}>Mis recetas</Typography>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center', py:0.5 }}>
                  <Typography sx={{ fontFamily:'Hedvig Letters Serif', fontSize:'15px', fontWeight:600 }}>Recetas Favoritas</Typography>
                </ListItemButton>
              </ListItem>
            </List>

        </Drawer>

      </Box>

    </>
    
  )
}
