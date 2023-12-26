import { dbConnection } from './database/config'
import cors from 'cors'

const express = require('express')
require('dotenv').config()


const app = express()

// Base de datos
dbConnection()

// CORS
app.use(cors())

// Dir publico
app.use( express.static('public') )

// Parseo de body
app.use( express.json() )

// Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/recipes', require('./routes/recipes'))
app.use('/api/categories', require('./routes/categories'))
app.use('/api/reviews', require('./routes/reviews'))


// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Corriendo en puerto ${ process.env.PORT }`)
})