import mongoose from 'mongoose'

export async function connectDb() {
    try {
        await  mongoose.connect(process.env.dbUrl)
        console.log('Connected to database')       
    } catch (error) {
        console.log('Error connecting to database', error.message);       
    }

}

