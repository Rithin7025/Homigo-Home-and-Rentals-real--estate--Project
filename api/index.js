import express from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { error } from 'console';
dotenv.config();

mongoose.connect(process.env.DATABASE_URL)
.then(()=> console.log('Database connected'))
.catch((error) => console.log(error))


app.listen(3000,()=>{
    console.log('server is running on port 3000!!')
})