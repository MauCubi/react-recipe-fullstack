import { Button, Grid, TextField, Typography, Link, Alert } from '@mui/material'
import { useForm } from 'react-hook-form'
import { DevTool } from "@hookform/devtools"
import { Link as RouterLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startRegister } from '../../store/auth/thunks';
import { useState, useEffect } from 'react';

export type FormAuthRegisterData = {
  name: string
  email: string
  password: string
};

export const Register = () => {

  const dispatch = useAppDispatch()
  const { errorMessage } = useAppSelector( state => state.auth )
  const [ credentialError, setcredentialError ] = useState<string | undefined>(undefined)

  const form = useForm<FormAuthRegisterData>({			
    defaultValues: {				
      name: '',
      email: '',
      password: '',
    }
  });

  useEffect(() => {
    if (errorMessage !== undefined && errorMessage !== 'Token Expiró') {
      setcredentialError(errorMessage)         
    }
  }, [errorMessage])

  const onSubmit = ( data: FormAuthRegisterData ) => {    
    setcredentialError(undefined)
    dispatch(startRegister(data))    
  }

  const { handleSubmit, register, control, formState } = form
	const { errors } = formState

  return (
    <Grid container justifyContent='center' alignItems='center' sx={{ minHeight:'100vh', backgroundColor:'primary.main'}}>
      <Grid container borderRadius='15px' sx={{ width:450, backgroundColor:'white', padding:3, boxShadow:'3' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>

            <Typography variant='h5' >Registrarse</Typography>

            <Grid item xs={ 12 } sx={{ mt: 2}}>

              <TextField label='Nombre de usuario' type="text" placeholder="username" fullWidth
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Nombre de usuario requerido'
                  },
                  minLength: {
                    value: 4,
                    message: 'Minimo 4 caracteres'
                  }
                }) }                  
              />
              {errors.name && <Typography fontSize={12} component='span' color='error'>{errors.name.message}</Typography>}
                
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2}}>

              <TextField label='Correo' type="email" placeholder="correo@google.com" fullWidth                 
                {...register('email', {
                  required: {
                      value: true,
                      message: 'Email requerido'
                  },
                  pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Formato de email inválido'
                  },
                })}
              />
              {errors.email && <Typography fontSize={12} component='span' color='error'>{errors.email.message}</Typography>}
              
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2}}>

              <TextField label='Contraseña' type="password" placeholder="Contraseña" fullWidth
                {...register('password', {
                  required: {
                      value: true,
                      message: 'Password requerido'
                  },
                  minLength: {
                      value: 4,
                      message: 'Minimo 4 caracteres'
                  }                                            
                })} 
              />
              {errors.password && <Typography fontSize={12} component='span' color='error'>{errors.password.message}</Typography>}

            </Grid>

            <Grid container sx={{mt:1}}>
                <Grid item xs={ 12 }> 
                  {
                    credentialError?
                    <Alert severity='error'>{credentialError}</Alert>
                    :
                    ''
                  }                 
                </Grid>
            </Grid>
            <Grid container spacing={ 2 } sx={{ mb:2, mt:1 }}>


              <Grid item xs={ 12 } sm={ 12 }>                  
                <Button variant="contained" type='submit' fullWidth>
                  Crear Cuenta
                </Button>
              </Grid>

              <Grid container direction='row' justifyContent='center' gap={0.50} sx={{ mt:2}}>
                <Typography>¿Ya tienes cuenta?</Typography>
                <Link component={ RouterLink } underline='hover' color='light.blue' to="/auth/login">                    
                  Ingresar                    
                </Link>
              </Grid>

            </Grid>

          </Grid>
        </form>
        <DevTool control={control}/>
        
      </Grid>
    </Grid>
  )
}
