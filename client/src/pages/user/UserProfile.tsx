import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useForm } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';


export type SettingsFormData = {    
  avatar: string | FileList | ArrayBuffer
};

export const UserProfile = () => {

  const { user } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()  
  const imageRef= useRef<null | HTMLDivElement>(null)
  
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
            console.log(errors)                         
        }        
    }
  }

  const onSubmit = async ( data: SettingsFormData ) => {         
    
  }  




  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>

      <Box component='div' sx={{ display:'flex', flexDirection:'column', width:'50%' }}>
        <Box sx={{ width:'70%', height:'100%', alignSelf:'center' }}>
            <Typography variant='h6' sx={{ fontFamily:'sans-serif'}}>Foto</Typography>                                              
            <Box                     
                ref={imageRef}           
                component='input'
                type='image'
                src={ imagePreview as string }
                sx={{ 
                    width:'100%', height:'240px', 
                    alignSelf:'center', 
                    borderStyle:'dashed',                                
                    borderWidth:1
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
              startIcon={<SaveOutlined />} 
              variant="contained" 
              type='submit' 
              sx={{ 
                  mr:4
              }}
          >
            Guardar                                    
          </Button>
          
      </Box>   
    </Box>
  )
}
