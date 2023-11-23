import mongoose from "mongoose";
import 'dotenv/config'

const connectDB = async() => {
    try {
        console.log(process.env.DATABASE_URL)
        const conn = await mongoose.connect(process.env.DATABASE_URL)
        console.log(`MonogoDb connected : ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error : ${error.message}`)
        process.exit(1) //process exits with some failure 
    }
}

export default connectDB;