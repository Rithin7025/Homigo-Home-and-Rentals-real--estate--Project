import express from 'express';
const app = express();
import connectDB from './database/db.js';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();

const allowedOrigins = [
    "http://localhost:5173",
     // Add your local IP here
  ];
  
  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );

const PORT = process.env.PORT || 8000

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

//database connection
connectDB();
//db


app.use(express.json()); //for parsing application/json
app.use(express.urlencoded({extended:true}));//for parsing application/x-www-form-urlencoded


app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})

app.get('/',(req,res)=>{
   res.json({hey : 'hello world'})
})

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

//middlware 
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})

