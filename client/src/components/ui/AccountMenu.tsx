import { Avatar, Button, Divider, Menu, MenuItem, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useState } from 'react';
import { startLogout } from '../../store/auth/thunks';
import { AccountCircle, KeyboardArrowDown, Logout, PostAdd, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';


export const AccountMenu = () => {

    const { user } = useAppSelector( state => state.auth )
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const dispatch = useAppDispatch()
  
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    

return (
    <>
        <Button       
            // onClick={ () => { dispatch(startLogout()) } }
            onClick={handleMenu}
            variant='outlined'        
            sx={{ 
                color:'white', 
                textTransform:'none',
                backgroundColor: (Boolean(anchorEl) === true)?'primary.light':'primary',
                borderColor:(Boolean(anchorEl) === true)?'white':'',  
                borderRadius:1,
                px:1,
                width:{
                    xs:'auto',
                    sm:'auto'
                },
                fontSize: 14,
                ":hover":{
                    backgroundColor:'primary.light',
                    borderColor:'white'          
                }
            }} 
            
        >            
            <Avatar sx={{ width: 27, height: 27, mr: { xs:0,sm:1 } }} src={ user?.avatar }/>   
            <Typography sx={{ fontFamily:'sans-serif', display:{ xs:'none', sm:'flex' } }}>
            { user?.name }
            </Typography>
            <KeyboardArrowDown sx={{ fontSize:18, ml:1, display:{ xs:'none', sm:'flex' } }}/>

        </Button>    
        <Menu
            id="menu-appbar"     
            anchorEl={anchorEl}
            disableScrollLock={true}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            slotProps={{
                paper: {
                    sx:{
                        backgroundColor:'#f1f7ff'
                    }
                }
            }}          
        >
            <Link to='/recetas/agregar-receta' style={{ textDecoration:'none'}}>
                <MenuItem onClick={handleClose}>
                    <PostAdd sx={{fontSize:'20px', mr:1, color:'black' }}/>
                    <Typography sx={{fontSize:'14px', color:'black'}}>
                        Agregar Receta
                    </Typography>
                </MenuItem>
            </Link>
            
            <Link to={`/usuario/${user?.uid}/${user?.name.replace(/ /g, '-')}`} style={{ textDecoration:'none'}}>
                <MenuItem onClick={handleClose}>
                    <AccountCircle sx={{ fontSize:'20px', mr:1, color:'black'  }}/>
                    <Typography sx={{ fontSize:'14px', color:'black' }}>
                        Perfil
                    </Typography>
                </MenuItem>
            </Link>

            <Link to='/configuracion' style={{ textDecoration:'none'}}>
                <MenuItem onClick={handleClose}>
                    <Settings sx={{ fontSize:'20px', mr:1, color:'black'  }}/>
                    <Typography sx={{ fontSize:'14px', color:'black' }}>
                        Configuración de Usuario
                    </Typography>
                </MenuItem>
            </Link>

            <Divider />

            <MenuItem onClick={ () => dispatch(startLogout()) }>
                <Logout sx={{ fontSize:'20px', mr:1 }}/>
                <Typography sx={{ fontSize:'14px' }}>
                Cerrar Sesión
                </Typography>
            </MenuItem>
        </Menu>
    </>
  )
}
