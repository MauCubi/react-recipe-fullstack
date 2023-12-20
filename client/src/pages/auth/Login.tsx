import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { DevTool } from "@hookform/devtools"
import { Link as RouterLink } from 'react-router-dom'
import { startLogin } from '../../store/auth/thunks'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useEffect, useState } from 'react'

export type FormAuthLoginData = {
  email: string
  password: string
};


export const Login = () => {  

  const { errorMessage } = useAppSelector( state => state.auth )

  const dispatch = useAppDispatch()  

  const [ credentialError, setcredentialError ] = useState<string | undefined>(undefined)
  
  const form = useForm<FormAuthLoginData>({			
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async ( data: FormAuthLoginData ) => { 
    setcredentialError(undefined)
    dispatch(startLogin(data))
  }

  useEffect(() => {
    if (errorMessage !== undefined && errorMessage !== 'Token Expiró') {
      setcredentialError(errorMessage)         
    }
  }, [errorMessage])
  

  const { handleSubmit, register, control, formState } = form
	const { errors } = formState

  return (
    <Grid container justifyContent='center' alignItems='center' sx={{ minHeight:'100vh', backgroundColor:'primary.main'}}>
      <Grid container borderRadius='15px' sx={{ width:450, backgroundColor:'white', padding:3, boxShadow:'3' }}>

        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>

              <Typography variant='h5'>Login</Typography>

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
                  <Button type='submit' variant='contained' fullWidth>
                    Login
                  </Button>
                </Grid>

                <Grid container direction='row' justifyContent='center' gap={0.50} sx={{ mt:2}}>
                  <Typography>¿No tienes cuenta? </Typography>
                  <Link component={ RouterLink } underline='hover' color='light.blue' to="/auth/register">                    
                      Registrate                    
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
