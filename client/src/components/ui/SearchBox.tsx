import { Search as SearchIcono } from '@mui/icons-material';
import { Box, Input } from '@mui/material';
import { styled } from '@mui/system';
import { useRef, useState } from 'react';
import { customTheme } from '../../theme/customTheme';
import { useNavigate } from 'react-router-dom';



export const SearchBox = () => {
          
    const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:'grey'
    }));     

    const navigate = useNavigate()
    

    const [searchValue, setSearchValue] = useState('')

    const searchInput = useRef<HTMLInputElement>(null)
    
    const handleKeyPress = (e:string) => {        
        if(e == 'Enter'){
            navigate(`/recetas/buscar/${searchValue.replace(/ /g, '-')}`)
            setSearchValue('')
        }
     }
      


  return (
    <Box component='div' sx={{
        position: 'relative',
        borderRadius: customTheme.shape.borderRadius,
        backgroundColor: 'white',
        marginRight: customTheme.spacing(2),
        marginLeft: 0,
        width: '40%',
        borderColor:'red',
        [customTheme.breakpoints.up('sm')]: {
          marginLeft: customTheme.spacing(3),
          width: '40%',
        },
    }}>
        <SearchIconWrapper>
            <SearchIcono />
        </SearchIconWrapper>
        <Input
            name='search'
            inputRef={searchInput}
            placeholder="Buscar receta..."
            value={searchValue}
            onChange={ e => setSearchValue(e.target.value) }
            disableUnderline
            onKeyDown={ e => handleKeyPress(e.key)}
            autoComplete='off'
            sx={{                
                fontFamily:'Hedvig Letters Serif',
                color: 'black',                
                width:'100%',
                '& .MuiInputBase-input': {
                    padding: customTheme.spacing(1, 1, 1, 0),
                    paddingLeft: `calc(1em + ${customTheme.spacing(4)})`,
                }
            }}
        />
    </Box>
  )
}
