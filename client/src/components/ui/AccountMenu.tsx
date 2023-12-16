import { Avatar, Button, Divider, Menu, MenuItem, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useState } from 'react';
import { startLogout } from '../../store/auth/thunks';
import { AccountCircle, Logout, PostAdd, Settings } from '@mui/icons-material';


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
                textTransform:'capitalize',
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
        <Avatar sx={{ width: 27, height: 27, mr: 1 }} src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}&backgroundColor=ffd5dc`}/>   
            <Typography sx={{ fontFamily:'sans-serif' }}>
            { user?.name } 
            </Typography>
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
            <MenuItem onClick={handleClose}>
                <PostAdd sx={{ fontSize:'20px', mr:1 }}/>
                <Typography sx={{ fontSize:'14px' }}>
                    Agregar Receta
                </Typography>
            </MenuItem>

            <MenuItem onClick={handleClose}>
                <AccountCircle sx={{ fontSize:'20px', mr:1 }}/>
                <Typography sx={{ fontSize:'14px' }}>
                    Perfil
                </Typography>
            </MenuItem>

            <MenuItem onClick={handleClose}>
                <Settings sx={{ fontSize:'20px', mr:1 }}/>
                <Typography sx={{ fontSize:'14px' }}>
                    Configuración de Usuario
                </Typography>
            </MenuItem>

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
