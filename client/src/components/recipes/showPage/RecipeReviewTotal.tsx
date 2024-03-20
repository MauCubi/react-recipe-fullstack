import { Box, LinearProgress, Rating, Typography } from '@mui/material'
import { useAppSelector } from '../../../store/hooks'

export const RecipeReviewTotal = () => {

    const { reviewDistribution, reviewsInfo } = useAppSelector( state => state.review )

  return (
    <Box component='div' sx={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', mt:4 }}>
        {
            (reviewDistribution.length !== 0)
            ?
            <Box component='div' sx={{ display:'flex', justifyContent:'center', flexDirection:'column', width:{xs:'70%',sm:'50%'} }}>
                <Box component='div' sx={{ display:'flex', justifyContent:'center', alignItems:'center', mb:2 }}>
                    <Rating value={reviewsInfo.average} readOnly precision={0.25}/>
                    <Typography sx={{ fontFamily:'Hedvig Letters Serif', ml:1, fontSize:{xs:'12px', sm:'16px'}  }}>{reviewsInfo.average} / 5 ({reviewsInfo.num})</Typography>
                </Box>

                <Box component='div' sx={{ display:'flex', flexDirection:'column-reverse', justifyContent:'center' }}>
                    {
                        reviewDistribution.map( reviewInfo => (
                            <Box key={reviewInfo.value} component='div' sx={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center' }}>
                                <Typography sx={{ fontFamily:'Hedvig Letters Serif', fontSize:'14px', width:'10px', mr:1}}>{ reviewInfo.value }</Typography>
                                <LinearProgress variant='determinate' value={reviewInfo.percentage} color='primary' sx={{ backgroundColor:'#80808057', height:'10px', mb:0.3, width:'150px' }}/>
                                <Typography sx={{ fontFamily:'Hedvig Letters Serif', fontSize:'14px', width:'15px', ml:1}}>({reviewInfo.quantity})</Typography>
                            </Box>
                        ))
                    }                 
                </Box>
            </Box>
            :''
        }
    </Box>
  )
}
