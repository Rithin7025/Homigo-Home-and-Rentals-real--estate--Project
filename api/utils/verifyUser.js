import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
import extractCookie from '../config/cookieExtractor.js'

export const verifyToken = (req,res,next) => {
    
    const token = req.cookies.access_token;
    console.log(token,'from the verify token')
    
    if(!token) return res.status(404).json({message : `token not found`});


   
        jwt.verify(token,process.env.JWT_SECRET, (err,user)=>{
            if(err){
                return res.status(404).json({errortype : 'no user'})
            }

            req.user = user;
            console.log('next called')  
            next();
        })

     
}