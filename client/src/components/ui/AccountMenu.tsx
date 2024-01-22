import { Avatar, Button, Divider, Menu, MenuItem, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useEffect, useState } from 'react';
import { checkAuthToken, startLogout } from '../../store/auth/thunks';
import { AccountCircle, KeyboardArrowDown, Logout, PostAdd, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { setUserSettingsStatus } from '../../store/user/userSlice';


export const AccountMenu = () => {

    const { user } = useAppSelector( state => state.auth )
    const { userSettingsStatus } = useAppSelector( state => state.user )
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const dispatch = useAppDispatch()
  
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(() => {
        if (userSettingsStatus === 'savingcomplete') {
            dispatch(checkAuthToken())            
            dispatch(setUserSettingsStatus('idle'))
            }    
    }, [userSettingsStatus])
    

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
                fontSize: 14,
                ":hover":{
                    backgroundColor:'primary.light',
                    borderColor:'white'          
                }
            }} 
            
        >            
        <Avatar sx={{ width: 27, height: 27, mr: 1 }} src={ user?.avatar }/>   
            <Typography sx={{ fontFamily:'sans-serif' }}>
            { user?.name }
            </Typography>
            <KeyboardArrowDown sx={{ fontSize:18, ml:1 }}/>

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
            
            <Link to='/usuario/agregar-receta' style={{ textDecoration:'none'}}>
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
