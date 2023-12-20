import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = (req,res,next) => {
    
    const token = req.cookies.access_token;
    console.log('token = ',token)
    if(!token) return res.status(403).json({message : `token not found`});


        console.log('inside verify user token')
        jwt.verify(token,process.env.JWT_SECRET, (err,user)=>{
            if(err){
                return res.status(404).json({errortype : 'no user'})
            }   
         
            req.user = user;
            console.log('next from verify token')
            //extractin role    
            const userRole = user.role;

             // Attach the role to the request object for further use in route handlers
             req.role = userRole;
        
    
            next();
        })

     
}