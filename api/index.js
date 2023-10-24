import express from 'express';
const app = express();
import userRouter from './routes/user.route.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { error } from 'console';
dotenv.config();
const PORT = process.env.PORT || 8000

mongoose.connect(process.env.DATABASE_URL)
.then(()=> console.log('Database connected'))
.catch((error) => console.log(error))


app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})

app.get('/',(req,res)=>{
   res.json({hey : 'hello world'})
})

app.use('/api/user',userRouter)

