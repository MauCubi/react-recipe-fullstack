import { MongoClient } from 'mongodb'

const express = require('express')
const body = require('body-parser')

async function start() {    
    try{

        const app = express();

        const mongo = await MongoClient.connect('mongodb+srv://mern_user:dhzyIL0nvupaV6IU@miclustercafe.ex7ag5u.mongodb.net/mern_recipes')

        await mongo.connect()

        app.db = mongo.db()
        

        // body parser - limit data

        app.use(body.json({
            limit: '500kb'
        }))


        // Routes

        app.use('/usuarios', require('./routes/usuarios'))

        // start server

        app.listen(3000, () => {
            console.log('Corriendo server puerto 3000')
        })

    }
    catch(error){
        console.log(error)
    }
}

start()
