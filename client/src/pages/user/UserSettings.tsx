import { NavBar } from '../../components/NavBar'
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useForm } from 'react-hook-form';
import { Box, Button, CircularProgress, Divider, Typography } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import { DevTool } from '@hookform/devtools';
import { startSavingUserSettings } from '../../store/user/thunks';
import { checkAuthToken } from '../../store/auth/thunks';
import { setUserSettingsStatus } from '../../store/user/userSlice';
import Swal from 'sweetalert2';

export type SettingsFormData = {    
  avatar: string | FileList
};

export const UserSettings = () => {

  const { user } = useAppSelector(state => state.auth)
  const { userSettingsStatus } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()  
  const imageRef= useRef<null | HTMLDivElement>(null)

  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-left',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  })
  
  const form = useForm<SettingsFormData>({			
      defaultValues: {
          avatar: user?.avatar,
      },
  });    

  const uploadClick = useRef<HTMLInputElement | null>(null)
  const { handleSubmit, register, control, formState } = form
  const { errors } = formState
  
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | undefined>(user?.avatar)

  const { ref, ...rest } = register('avatar', { 
    required: { value:user?false:true, message:'Imagen necesaria'},              
    onChange: (e) => { onFileInputChange(e) }
  });


  const onFileInputChange = ({ target }: {target: HTMLInputElement}) => {
    if ( target.files?.length === 0 || !target.files) {
        return         
    } else {
        const selectedFile = target.files[0]
        const reader = new FileReader()
        reader.onload = function(){
            setImagePreview(this.result as string)
        }
        reader.readAsDataURL(selectedFile)      
        
        if (selectedFile.size > 100000000) {
            form.setError('avatar',{type:'custom', message:'El tamaño es muy grande'} , {shouldFocus: true})
        } else {
            form.clearErrors('avatar')                     
        }        
    }
  }

  useEffect(() => {

    form.setValue('avatar', user?.avatar as string)
    setImagePreview(user?.avatar)
    
  }, [user?.avatar, form])

  // useEffect(() => {

  //   if (userSettingsStatus === 'savingcomplete') {
  //     dispatch(checkAuthToken)
  //     console.log('YEAH')
  //     dispatch(setUserSettingsStatus('idle'))
  //   }    
  // }, [userSettingsStatus, dispatch])

  useEffect(() => {
    if (userSettingsStatus === 'savingcomplete') {
        dispatch(checkAuthToken())            
        dispatch(setUserSettingsStatus('idle'))
        Toast.fire({
          icon: 'success',
          title: 'Cambios guardados'
        })      

        }    
}, [userSettingsStatus, dispatch])
  
  

  const onSubmit = async ( data: SettingsFormData ) => {         
    dispatch(startSavingUserSettings(data, user?.uid as string))
    form.reset({}, { keepValues: true })
  }  

  return (
    <>
        <NavBar />

        <Box component='div' sx={{ display:'flex', minHeight:'90vh', backgroundColor:'#e4f0ff66', justifyContent:'center'}}>

          <Box component='div' borderRadius='15px' sx={{ backgroundColor:'white', boxShadow:3, p:3, my:4, width:'70%', flexDirection:'row'}}>

            <Typography variant='h5' sx={{ color:'primary.light' }}>Configuracion de usuario</Typography>             
            <Divider sx={{ my:2 }}/>

            {
              (imagePreview !== undefined)?
              <Box component='form' onSubmit={handleSubmit(onSubmit)} >
                <Box component='div' sx={{ display:'flex', flexDirection:'column', width:'100%'}}>
                  <Box sx={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center' }}>
                      <Typography variant='h6' sx={{ fontFamily:'sans-serif'}}>Cambiar Avatar</Typography>   
                                                              
                      <Box                     
                          ref={imageRef}           
                          component='input'
                          type='image'
                          src={ imagePreview as string }
                          disabled={userSettingsStatus==='saving'}
                          sx={{ 
                              width:'160px', height:'160px', 
                              alignSelf:'center',
                              borderRadius:'50%',
                              ":hover":{
                                opacity:'70%'
                              }
                              }}
                          onClick={ (e) => {
                          e.preventDefault()
                          uploadClick.current?.click()                                
                      } }
                      >                               
                      </Box>
                      {errors.avatar && <Typography fontSize={12} component='span' color='error'>{errors.avatar.message}</Typography>}                           
                      <Typography component='p' fontSize={12} color='gray'>Tamaño maximo 100mb</Typography>
                      <input {...rest } type='file' style={{ display:'none'}}
                          accept="image/*"
                          ref={(e) => {
                                  ref(e)
                                  uploadClick.current = e                                        
                          }}                                                              
                      />
                  </Box>                        
                </Box>



                <Box component='div' sx={{ display:'flex', mt:8, justifyContent:'end' }}>
                    <Button 
                        startIcon={(userSettingsStatus==='saving')?<CircularProgress size={20} sx={{ color:'#00000042' }}/>:<SaveOutlined />} 
                        variant="contained" 
                        type='submit' 
                        disabled={!form.formState.isDirty}
                        sx={{ 
                            mr:4
                        }}
                    >
                      Guardar Cambios                                   
                    </Button>
                    
                </Box>   
              </Box>
              
              :
              <CircularProgress />

            }

          <DevTool control={control}/>
          </Box>
        </Box>

    </>
  )
}
