import { DevTool } from '@hookform/devtools';
import { Avatar, Box, Button, Divider, Rating, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { startCreatingReview } from '../../../store/review/thunks';


export type FormReviewData = {    
    rating: number | null,
    comment: string,
    recipe: string
}


export const RecipeReviewForm = () => {

    const { user } = useAppSelector(state => state.auth)
    const { activeRecipe } = useAppSelector(state => state.recipe)
    const { reviewsInfo, userReview } = useAppSelector(state => state.review)
    const dispatch = useAppDispatch()

    const form = useForm<FormReviewData>({			
        defaultValues: {
            rating: null,
            comment: '',
            recipe: activeRecipe?._id
        }
    })

    const { handleSubmit, register, control, formState } = form
    const { errors } = formState

    const onSubmit = (data: FormReviewData) => {        
        console.log(data)
        data.recipe = activeRecipe?._id as string
        dispatch(startCreatingReview(data, reviewsInfo))
    }    


  return (
    <Box className='recipe-review-form' component='div' 
        sx={{ 
            display:'flex', 
            flexDirection:'column', 
            backgroundColor:'white',
            border:0.5,
            borderColor:'#dce2e6',
            borderRadius:0.5,
            width:'85%',
            alignSelf:'center',
            p:2,
            boxShadow:3
        }}
    >
        {
            (userReview)
            ?
            <Box component='div' display='flex' flexDirection='column'> 
                
                <Typography variant='h6' sx={{ fontFamily:'serif'}}>Tu reseña</Typography>   
                <Divider sx={{ my:1 }}/>
                           
                        
                <Box component='div' sx={{ display:'flex' }} >
                    <Avatar sx={{ width: 27, height: 27, mr: 1 }} src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}&backgroundColor=ffd5dc`}/>
                    <Typography sx={{ textTransform:'capitalize', fontWeight:600, fontFamily:'Hedvig Letters Serif' }}>
                        { user?.name }
                    </Typography>
                </Box>

                <Rating sx={{ fontSize:'22px', my:1}} readOnly value={userReview.rating} precision={0.25} />

                <Typography sx={{ fontFamily:'sans-serif' }}>
                    {
                        (userReview.comment !== '')
                        ?userReview.comment
                        :'(Sin comentario)'
                    }
                    
                </Typography>
            </Box>    
            :<>            
                <Box component='form' onSubmit={ handleSubmit(onSubmit) } sx={{ display:'flex',flexDirection:'column' }}>

                    <Box component='div' sx={{ display:'flex', mb:1 }}>
                        <Avatar sx={{ width: 27, height: 27, mr: 1 }} src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}&backgroundColor=ffd5dc`}/>
                        <Typography sx={{ fontFamily:'Hedvig Letters Serif', textTransform:'capitalize', fontWeight:600 }}>
                            { user?.name }
                        </Typography>
                    </Box>

                    <Box component='div' sx={{ display:'flex', alignItems:'center' }}>
                        <Controller
                            name='rating'
                            control={control}
                            defaultValue={null}
                            rules={{ required: { value:true, message:'Debe elegir una calificacion de la receta'} }}
                            render={() => <Rating inputMode='numeric' name='rating' sx={{ fontSize:'22px', mr:1}} value={ form.getValues('rating') }
                                onChange={ (event, newValue) => newValue!==null && form.setValue('rating', newValue) }
                            />}
                        />
                        {errors.rating && <Typography fontSize={12} component='span' color='error'>{errors.rating.message}</Typography>} 
                    </Box>


                    <TextField 
                        type='text' label='Escribe un comentario (opcional)' 
                        multiline 
                        minRows='3'
                        maxRows='3'
                        sx={{ 
                            mt:1.5, 
                            backgroundColor:'white',
                            
                        }} 
                        placeholder='¿Qué te parecio esta receta?'
                    {...register('comment')}
                    />

                    

                    <Box component='div' sx={{ display:'flex', width:'100%', justifyContent:'flex-end' }}>
                        <Button 
                            type='submit' 
                            variant='contained' 
                            sx={{ 
                                textTransform:'none', 
                                mt:2, 
                                width:'fit-content',
                                backgroundColor:'primary.light' 
                            }}
                        >
                            Publicar
                        </Button>
                    </Box>

                </Box>
                <DevTool control={control}/>
            </>
            
        }
    </Box>
  )
}
