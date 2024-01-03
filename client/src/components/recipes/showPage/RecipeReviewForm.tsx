import { DevTool } from '@hookform/devtools';
import { Avatar, Box, Button, Divider, Rating, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { startCreatingReview, startDeletingReview, startUpdatingReview } from '../../../store/review/thunks';
import { Delete, Edit } from '@mui/icons-material';
import { Review } from '../../../types';
import { useEffect } from 'react';
import Swal from 'sweetalert2'
import { onChangeUserReviewStatus } from '../../../store/review/reviewSlice';


export type FormReviewData = {    
    rating: number | null,
    comment: string,
    recipe: string
}


export const RecipeReviewForm = () => {

    const { user } = useAppSelector(state => state.auth)
    const { activeRecipe } = useAppSelector(state => state.recipe)
    const { reviewsInfo, userReview, userReviewStatus } = useAppSelector(state => state.review)
    const dispatch = useAppDispatch()    

    const form = useForm<FormReviewData>({			
        defaultValues: {
            rating: null,
            comment: '',
            recipe: activeRecipe?._id
        }
    })

    const { handleSubmit, register, control, formState , reset } = form
    const { errors } = formState

    useEffect(() => {
        if (formState.isSubmitSuccessful && userReview !== null) {
            reset()
          }
    }, [userReview])

    useEffect(() => {
        if (userReviewStatus === 'editing') {
            form.setValue('comment', userReview?.comment as string)
            form.setValue('rating', userReview?.rating as number)
        }
    }, [userReviewStatus])

    const onSubmit = (data: FormReviewData) => {        
        data.recipe = activeRecipe?._id as string       
        
        if (userReviewStatus === 'editing') {
            dispatch(startUpdatingReview(data, reviewsInfo, userReview as Review))
        } else {
            dispatch(startCreatingReview(data, reviewsInfo))             
        }
        
    }    

    const onDelete = () => {

        Swal.fire({
            title: "¿Realmente quieres borrar la reseña?",       
            showConfirmButton:false,     
            showCancelButton: true,
            showDenyButton: true,
            denyButtonText: 'Borrar',
            cancelButtonText: 'Cancelar',
            icon:'question'
            
          }).then((result) => {
            if (result.isDenied) {
                dispatch(startDeletingReview(reviewsInfo, userReview as Review))
                Swal.fire("Reseña eliminada", "", "success");
            }
          });
        
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
            (userReview && (userReviewStatus !== 'editing' ))
            ?
            <Box component='div' display='flex' flexDirection='column'> 

                <Box component='div' display='flex' justifyContent='space-between'>
                    <Typography variant='h6' sx={{ fontFamily:'serif'}}>Tu reseña</Typography>   
                    
                    <Box component='div' display='flex' sx={{ gap:'1rem' }}>
                        
                            <Button 
                                startIcon={<Edit />} 
                                variant="contained" 
                                size='small' 
                                color="warning" 
                                onClick={() => dispatch(onChangeUserReviewStatus('editing'))}
                                sx={{ 
                                    textTransform:'none' 
                                    }}
                                >                            
                                Editar
                            </Button>

                            <Button 
                                startIcon={<Delete />} 
                                variant="contained" 
                                size='small' 
                                color="error" 
                                sx={{ 
                                    textTransform:'none' 
                                    }}
                                onClick={ onDelete }
                                >                            
                                Borrar
                            </Button>
                        
                    </Box>

                </Box>
                
                
                <Divider sx={{ my:1 }}/>
                           
                        
                <Box component='div' sx={{ display:'flex' }} >
                    <Avatar sx={{ width: 27, height: 27, mr: 1 }} src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}&backgroundColor=ffd5dc`}/>
                    <Typography sx={{ fontWeight:600, fontFamily:'Hedvig Letters Serif' }}>
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
                        <Typography sx={{ fontFamily:'Hedvig Letters Serif', fontWeight:600 }}>
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
                            disabled={ (userReviewStatus==='saving')? true : false }
                            sx={{ 
                                textTransform:'none', 
                                mt:2, 
                                width:'fit-content',
                                backgroundColor:'primary.light' 
                            }}
                        >
                            {
                                (userReviewStatus !== 'editing')
                                ?'Publicar Reseña'
                                :'Actualizar Reseña'
                            }
                        </Button>
                    </Box>

                </Box>
                <DevTool control={control}/>
            </>
            
        }
    </Box>
  )
}
