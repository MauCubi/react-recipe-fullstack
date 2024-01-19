import { Avatar, Box, Divider, Rating, Typography } from '@mui/material'
import { useAppSelector } from '../../../store/hooks'



export const RecipeReviewList = () => {

    const { reviews } = useAppSelector( state => state.review )


  return (
    <Box component='div' display='flex' flexDirection='column'>

        <Divider textAlign="left" sx={{ my:5, fontSize:'20px', width:'100%', fontFamily:'sans-serif', color:'#56797e' }}>
            Comentarios ({reviews.filter( x => x.comment !== '').length})
        </Divider>

            {
                reviews.map( review => (
                    
                    (review.comment !== '')
                    ? 
                    <Box component='div' display='flex' flexDirection='column' key={review._id}>                    
                        
                            <Box component='div' sx={{ display:'flex' }} >
                                <Avatar sx={{ width: 27, height: 27, mr: 1 }} src={review.user.avatar}/>
                                <Typography sx={{ fontWeight:600, fontFamily:'Hedvig Letters Serif' }}>
                                    { review.user.name }
                                </Typography>
                            </Box>

                            <Rating sx={{ fontSize:'22px', my:1}} readOnly value={review.rating} precision={0.25} />

                            <Typography sx={{ fontFamily:'sans-serif' }}>
                                { review.comment }
                            </Typography>
                                            
                        <Divider sx={{ width:'100%', my:3 }}/>
                    </Box>                     
                    :''
                    
                ))
            }        

    </Box>
  )
}
