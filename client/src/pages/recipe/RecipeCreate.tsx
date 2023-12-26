import { Box, Button, CircularProgress, Divider, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react';
import '@fontsource/roboto/400.css';
import { useForm, useFieldArray } from 'react-hook-form'
import { IIngredients, ITime } from '../../types';
import { DevTool } from '@hookform/devtools';
import AddIcon from '@mui/icons-material/Add';
import { RemoveCircleOutline, SaveOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startSavingRecipe } from '../../store/recipe/thunks';
import { startLoadingCategories } from '../../store/category/thunks';
import { useNavigate } from 'react-router-dom';
import { setCompleteSaving } from '../../store/recipe/recipeSlice';


export type FormRecipeData = {    
    name: string
    description: string
    category: string | null
    cookTime: ITime
    steps: { name: string }[]
    ingredients: IIngredients[]   
    image: string | FileList
};



export const RecipeCreate = () => {

    const { isSaving } = useAppSelector(state => state.recipe)
    const { categories, isLoadingCategories } = useAppSelector(state => state.category)
    const navigate = useNavigate()
    
    const form = useForm<FormRecipeData>({			
        defaultValues: {
            name: '',
            description: '',
            category:  !isLoadingCategories? categories[0]._id : undefined ,
            cookTime: {
                time: 1,
                unit: 'Minutos'
            },
            steps: [{ name: '' }],
            ingredients: [{ name: '', quantity: '', unit:'Gramos' }], 
            image: ''
        }
    });    

    const dispatch = useAppDispatch()    
    
    const uploadClick = useRef<HTMLInputElement | null>(null)
    const { handleSubmit, register, control, formState } = form
    const { errors } = formState
    
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>('https://img.freepik.com/free-photo/camera-sign-front-side-with-white-background_187299-39792.jpg?w=740&t=st=1701702193~exp=1701702793~hmac=432d669fa8a80768dc4f1ec4b0c3993aeeae84c33fe325a17f74a1ab9091afed')
    
    const { fields: stepList,
        remove: removeStep, 
        append: appendStep } = useFieldArray({ control, name: "steps" });
        
    const { fields: ingredientList,
        remove: removeIngredient, 
        append: appendIngredient } = useFieldArray({ control, name: "ingredients" });
    
    const { ref, ...rest } = register('image', { 
        required: { value:true, message:'Imagen necesaria'},
        onChange: (e) => { onFileInputChange(e) }               
    
    });

    useEffect(() => {
       dispatch( startLoadingCategories() )  
       if (!isLoadingCategories) {
           form.setValue('category', categories[0]._id)         
       } 

    }, [categories])
    

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
        }

    }


    const onSubmit = async ( data: FormRecipeData ) => {  

        // CHECK
        const recipe = await dispatch(startSavingRecipe(data))
        dispatch(setCompleteSaving())
        navigate(`/recipes/${recipe._id}/${recipe.name.replace(/ /g, '-')}`)
    }  


  return (
      <Box component='div' sx={{ display:'flex', minHeight:'100vh', backgroundColor:'#e4f0ff66', justifyContent:'center'}}>
    {
        (!isLoadingCategories)?
        <Box component='div' borderRadius='15px' sx={{ backgroundColor:'white', boxShadow:3, p:3, my:4, width:'70%', flexDirection:'row'}}>
            <Typography variant='h5' sx={{ color:'primary.light' }}>Agrega una Receta</Typography>            
            <Divider sx={{ my:2 }}/>

            <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                <Box component='div' sx={{ display:'flex', flexDirection:'row', width:'100%' }}>

                    <Box component='div' sx={{ display:'flex', flexDirection:'column', width:'50%', gap:4, mt:2 }}>
                                                  
                            <TextField type='text' label='Nombre de la Receta' size='small' required inputProps={{ maxLength:90 }}
                                {...register('name', {
                                    required: {
                                        value: true,
                                        message: 'Nombre de la receta es obligatorio'
                                    },
                                    maxLength:{
                                        value: 90,
                                        message: 'Maximo caracteres 90'
                                    }
                                })}   
                            /> 
                            {errors.name && <Typography fontSize={12} component='span' color='error'>{errors.name.message}</Typography>}                           
                                                                            
                            <TextField type='text' label='Descripcion' size='small' multiline minRows={7} maxRows={7} inputProps={{ maxLength:250}} required
                                {...register('description', {
                                    required: {
                                        value: true,
                                        message: 'La descripcion es obligatoria'
                                    },
                                    maxLength:{
                                        value:250,
                                        message: 'Maximo 250 caracteres'
                                    }
                                })}                           
                            />                            
                        
                    </Box>

                    <Box component='div' sx={{ display:'flex', flexDirection:'column', width:'50%' }}>
                        <Box sx={{ width:'70%', height:'100%', alignSelf:'center' }}>
                            <Typography variant='h6' sx={{ fontFamily:'sans-serif'}}>Foto</Typography>                                              
                            <Box                                         
                                component='input'
                                type='image'
                                src={ imagePreview as string}
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
                            {errors.image && <Typography fontSize={12} component='span' color='error'>{errors.image.message}</Typography>}                           
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
                    
                </Box>    
                
                                        
                <Box component='div' sx={{ width:'100%', gap:4, mt:2, display:'flex', flexDirection:'column',  justifyContent:'space-between' }}>
                            

                    {
                        categories?
                        <FormControl sx={{ width:'50%'}}>    
                                <InputLabel htmlFor='select-category'>Categoria de receta</InputLabel>                                
                                {/* <Select id='select-category' defaultValue='Entradas' size='small' label='Categoria de receta' */}
                                <Select id='select-category' defaultValue={ !isLoadingCategories? categories[0]._id : undefined } size='small' label='Categoria de receta'
                                    {...register('category', { required: true })}>
                                        {
                                            categories?.map( category => (
                                                <MenuItem key={category._id} value={category._id}>{ category.name }</MenuItem>
                                            ))
                                        }
                                </Select>                            
                        </FormControl>:''
                    }
                     

                    <Box component='div' sx={{ width:'50%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}> 
                        
                        <Typography component='label' color='gray' fontSize={16}>Tiempo de preparación *</Typography>
                        <TextField sx={{ width:'20%' }} type='number' size='small' inputProps={{ min:1 }} placeholder='1' 
                            {...register('cookTime.time', { 
                                required: {
                                    value: true,
                                    message: 'El tiempo de preparacion es necesario'
                                },
                                min: {
                                    value: 1,
                                    message: 'El tiempo de preparacion debe ser positivo'
                                }
                            })}
                        />
                        
                        <FormControl size='small' sx={{ width:'30%'}}>                                    
                            <Select id='select-cook-unit' defaultValue='Minutos' required
                                {...register('cookTime.unit', { 
                                    required: {
                                        value:true,
                                        message: 'El tiempo de preparacion es necesario'
                                    }
                                })}
                            >
                                <MenuItem value='Minutos' selected>Minutos</MenuItem>
                                <MenuItem value='Horas'>Horas</MenuItem>
                                <MenuItem value='Dias'>Dias</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>
                                
                </Box>                           
                
                
                
                <Box component='div'>
                <Divider textAlign="left" sx={{ my:5, fontSize:'20px', fontFamily:'sans-serif', color:'#56797e' }}>Ingredientes</Divider>
                <Box component='div' display='flex' gap={2} flexDirection='column'>
                        {
                            ingredientList.map((field, index) => {
                                return (
                                    <Box component='div' key={field.id} sx={{ display:'flex', gap:2}}>
                                        <TextField
                                            sx={{
                                                width:'35%'
                                            }}
                                            label='Nombre'
                                            type='text'
                                            size='small'
                                            required
                                            {...register(`ingredients.${index}.name` as const, {
                                                required: {
                                                    value: true,
                                                    message: 'El nombre del ingrediente es necesario'
                                                }
                                            })}
                                        />
                                        <TextField
                                            label='Cantidad'
                                            type='text'
                                            size='small'
                                            required
                                            {...register(`ingredients.${index}.quantity` as const, {
                                                required: {
                                                    value: true,
                                                    message: 'La cantidad del ingrediente es necesario'
                                                }
                                            })}
                                        />
                                        <FormControl size='small' sx={{ width:'25%' }}>                                    
                                            <Select id='select-ingredient-unit' defaultValue='Gramos'
                                                {...register(`ingredients.${index}.unit` as const)}                                            >
                                                <MenuItem value='Gramos' selected>Gramos</MenuItem>
                                                <MenuItem value='Kilogramos'>Kilogramos</MenuItem>
                                                <MenuItem value='Centilitros'>Centilitros</MenuItem>
                                                <MenuItem value='Mililitros'>Mililitros</MenuItem>
                                                <MenuItem value='Litros'>Litros</MenuItem>
                                                <MenuItem value='Cucharas de cafe'>Cucharas de cafe</MenuItem>
                                                <MenuItem value='Cucharas sopera'>Cucharas sopera</MenuItem>
                                                <MenuItem value='Tazas'>Tazas</MenuItem>
                                                <MenuItem value='Unidades'>Unidades</MenuItem>
                                                <MenuItem value='A gusto'>A gusto</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {
                                            index > 0 && (
                                            <IconButton onClick={() => removeIngredient(index)}>
                                                <RemoveCircleOutline />
                                            </IconButton>
                                            )
                                        }
                                    </Box>
                                    )})
                        }
                        <Button 
                            startIcon={<AddIcon />} 
                            variant='outlined' 
                            sx={{ 
                                width:'fit-content', 
                                textTransform:'none'
                            }} 
                            onClick={() => appendIngredient({name:'', quantity:'', unit:'Gramos'})}
                        >
                            Agregar Ingrediente
                        </Button>
                    </Box>

                </Box>
                


                <Box component='div'>
                
                <Divider textAlign="left"  sx={{ my:3, fontSize:'20px', fontFamily:'sans-serif', color:'#56797e' }} >Pasos</Divider>
                    <Box component='div' display='flex' gap={2} flexDirection='column'>
                        {
                            stepList.map((field, index) => {
                                return (
                                    <Box component='div' key={field.id} >
                                        <TextField 
                                            multiline
                                            minRows={1}
                                            sx={{ 
                                                width:'80%'
                                            }}
                                            type='text'
                                            size='small' 
                                            InputProps={{
                                                startAdornment: <InputAdornment sx={{ color:'darkgray'}} position="start">{index + 1}</InputAdornment>
                                            }}
                                            required
                                            {...register(`steps.${index}.name` as const, {
                                                required: {
                                                    value: true,
                                                    message: 'Debe rellenar el paso'
                                                }
                                            })}
                                        />
                                        {
                                            index > 0 && (
                                            <IconButton onClick={() => removeStep(index)}>
                                                <RemoveCircleOutline />
                                            </IconButton>
                                            )
                                        }
                                    </Box>
                                    )})
                        }
                        <Button 
                            startIcon={<AddIcon />} 
                            variant='outlined' 
                            sx={{ 
                                width:'fit-content',
                                textTransform:'none'
                            }} 
                            onClick={() => appendStep({name:''})}
                        >
                            Agregar Paso
                        </Button>
                    </Box>
                </Box>

                <Box component='div' sx={{ display:'flex', mt:8, justifyContent:'end' }}>
                    <Button 
                        startIcon={ !isSaving? <SaveOutlined /> : <CircularProgress size={20} sx={{ color:'#00000042' }} />} 
                        variant="contained" 
                        type='submit' 
                        sx={{ 
                            mr:4
                        }}
                        disabled={isSaving}
                    >
                        Subir Receta                       
                    </Button>
                    
                </Box>
                
            </Box>
            <DevTool control={control}/>


        </Box>
        :
        'Loading'       
    }


    </Box>
  )
}
