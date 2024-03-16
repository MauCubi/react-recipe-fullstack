import { IconButton, Stack, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const Socials = () => {
  return (
    <Stack 
        component='div'
        direction={{
          xs:'row',
          sm:'column'
        }}
        width='100%' 
        height={{ xs:'60px', sm:'100px', md:'70px' }}           
        display='flex'
        alignSelf='center' 
        alignItems='center'
        bottom='0'
        sx={{ backgroundColor:'#303030' }}
        justifyContent='center'       
      
    >    
            
    <Typography 
      fontSize={{
        xs:16,
        sm:20,
        md:18
      }} 
      fontFamily='serif' 
      color='white'
      
    >
      Copyright &copy; 2023 Cubilla Mauro
    </Typography>

    <Stack 
      direction='row' 
      spacing={{
        sm:'0',
        md:'2'
      }}
    >
      <IconButton sx={{ color:'white'}} onClick={ () => { window.open('https://www.linkedin.com/in/macubi90/') }}>
        <LinkedInIcon sx={{ fontSize:{ xs:'25px', sm:'32px', md:'24px'}  }} />
      </IconButton>
      <IconButton sx={{ color:'white'}} onClick={ () => { window.open('https://github.com/MauCubi') }}>
        <GitHubIcon sx={{ fontSize:{ xs:'25px', sm:'32px', md:'24px'}  }} />
      </IconButton>
    </Stack>

  </Stack>
  )
}
