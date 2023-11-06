import express from 'express';
const app = express();
import connectDB from './database/db.js';
import dotenv from 'dotenv';
import cors from 'cors'
import session from 'express-session';

dotenv.config();

const allowedOrigins = [
    "http://localhost:5173",
     // Add your local IP here
  ];
  console.log(process.env.SESSION_SECRET)
  app.use(
    session({
      secret: process.env.SESSION_SECRET, // Replace with a secure random key
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 3600000, 
      },
    })
  );

  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );

const PORT = process.env.PORT || 8000

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import adminRouter from './routes/admin.route.js'


//database connection
connectDB();
//db


app.use(express.json()); //for parsing application/json
app.use(express.urlencoded({extended:true}));//for parsing application/x-www-form-urlencoded


app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})

app.get('/',(req,res)=>{
   res.json({server : 'from the server'})
})

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/admin',adminRouter);


//middleware 
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})

