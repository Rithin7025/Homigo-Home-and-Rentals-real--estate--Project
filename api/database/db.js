import mongoose from "mongoose";
import 'dotenv/config'
console.log(process.env.DATABASE_URL,'mongo db connection string')
const connectDB = async() => {
    try {
        // console.log(process.env.DATABASE_URL,'here the connection from env')
        const conn = await mongoose.connect(process.env.DATABASE_URL)
        console.log(`MonogoDb connected : ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error : ${error.message}`)
        process.exit(1) //process exits with some failure 
    }
}

export default connectDB;