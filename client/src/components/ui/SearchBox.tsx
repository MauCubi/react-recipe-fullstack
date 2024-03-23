import { Search as SearchIcono } from '@mui/icons-material';
import { Box, Input, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { customTheme } from '../../theme/customTheme';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { startLoadingSugestions } from '../../store/recipe/thunks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { onLoadingSugestions } from '../../store/recipe/recipeSlice';
import { Link } from 'react-router-dom';


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
    const dispatch = useAppDispatch()

    const [searchValue, setSearchValue] = useState('')
    const [searchWidgetDisplay, setSearchWidgetDisplay] = useState('none')

    const { sugestions, isLoadingSugestions } = useAppSelector(state => state.recipe)

    const debouncedSearchValue = useDebounce(searchValue, 500)

    const searchInput = useRef<HTMLInputElement>(null)
    const menuRef = useRef<HTMLDivElement>()    
    
    
    const handleKeyPress = (e:string) => {        
        if(e == 'Enter'){
            navigate(`./recetas/buscar/${searchValue.replace(/ /g, '-')}`)
            navigate(0)
            setSearchValue('')
        }        
    }    

    useEffect(() => {
      if (debouncedSearchValue.length < 2) {
        dispatch(onLoadingSugestions({recipes: []}))
      } else if (debouncedSearchValue.trim() !== '') {        
        dispatch(startLoadingSugestions(debouncedSearchValue))
      }
    }, [debouncedSearchValue])   

    useEffect(() => {
        if (sugestions?.length !== 0 && isLoadingSugestions !== true) {
            setSearchWidgetDisplay('flex')            
        } else {
            setSearchWidgetDisplay('none')
        }        
    }, [sugestions])
    


    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!menuRef.current?.contains(e.target as Node) && !searchInput.current?.contains(e.target as Node)) {
                setSearchWidgetDisplay('none')       
            }
        }
                
        document.addEventListener('mousedown', handler)

        return() => {
            document.removeEventListener('mousedown', handler)
        }
    })    
      


  return (
    <Box component='div' sx={{ display:'flex', flexDirection:'column', width:{ xs:'60%',sm:'40%' }, position:'relative' }}>
        <Box component='div'  sx={{
            position: 'relative',
            borderRadius: customTheme.shape.borderRadius,
            backgroundColor: 'white',
            marginRight: customTheme.spacing(2),
            marginLeft: 0,
            width: '100%',
            borderColor:'red',
            [customTheme.breakpoints.up('sm')]: {
            marginLeft: customTheme.spacing(3),
            width: '100%',
            },
        }}>
            <SearchIconWrapper>
                <SearchIcono sx={{ fontSize:{ xs:'16px', sm:'27px' } }} />
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
                    fontSize:{ xs:'12px', sm:'14px' },
                    color: 'black',                
                    width:'100%',
                    '& .MuiInputBase-input': {
                        padding: customTheme.spacing(1, 1, 1, 0),
                        paddingLeft: `calc(1em + ${customTheme.spacing(4)})`,
                    }
                }}
            />
        </Box>
        <Box 
            component='div'                       
            position='absolute'
            ref={menuRef}
            display={(searchWidgetDisplay)? searchWidgetDisplay : 'none'}
            // display={(!isLoadingSugestions && sugestions?.length !== 0)? 'flex' : 'none'}
            border={(!isLoadingSugestions)? 'solid' : 'none'}
            sx={{ 
                backgroundColor:'white',
                borderColor:'GrayText',
                borderRadius:'3px',
                borderWidth:'1px',
                marginLeft: { sx:customTheme.spacing(0), sm:customTheme.spacing(3) },
                width:'100%',
                top:'40px',
            }}
        >
            {
                // (!isLoadingSugestions && sugestions?.length !== 0)
                (!isLoadingSugestions && sugestions?.length !== 0)
                ?
                <List sx={{ width:'100%'}}>
                    {
                    sugestions?.map( recipe =>                     
                            <Link key={recipe._id} to={`/recetas/${recipe._id}/${recipe.name.replace(/ /g, '-')}`} reloadDocument style={{textDecoration:'none', textTransform:'none'}}>
                            <ListItem disablePadding>
                                    <ListItemButton    
                                        disableRipple                                                                     
                                        sx={{ 
                                            height:'100%',                            
                                            textAlign: 'center', 
                                            py:0.5  
                                        }} 
                                        // onClick={() => window.location.href = `/recetas/${recipe._id}/${recipe.name.replace(/ /g, '-')}`}
                                    >
                                        <Box 
                                            component='img' 
                                            src={recipe.image} 
                                            sx={{
                                                height:'40px',
                                                width:'60px',
                                                mr:'0.625rem'
                                            }}
                                        />
                                        <Typography 
                                            sx={{ 
                                                fontFamily:'Hedvig Letters Serif', 
                                                fontSize:{ xs:'12px', sm:'14px' }, 
                                                color:'black', 
                                                textDecoration:'none',
                                                textAlign:'left'
                                            }}
                                        >
                                            {recipe.name}
                                        </Typography>
                                    </ListItemButton>                                
                            </ListItem>
                            </Link>
                        )
                    }
                </List>                    
                :''
            }           
                
        </Box>
    </Box>
  )
}
