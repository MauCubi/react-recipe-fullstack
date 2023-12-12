const mongoose = require('mongoose')

export const dbConnection = async () => {

    try {
        mongoose.connect(process.env.DB_CNN)
        mongoose.set('strictQuery', true)
        console.log('DB ONLINE')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error al inicializar base se datos')
    }

}