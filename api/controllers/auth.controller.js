import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken'
import {configEmail , configPassword} from '../config/config.js'
dotenv.config();

export const signup = async (req, res, next) => {

     console.log('entered sign up')
  const { userName, email, password, phone } = req.body;
  
  
  const duplicateName = await User.findOne({userName})
  const duplicateEmail = await User.findOne({email})


  if(duplicateEmail){
    return res.status(409).json({message : 'User with the same email exists',errorType : 'duplicateEmail'})
  }
  if(duplicateName){
    return res.status(500).json({message : 'User with the same name already exists',errorType : 'duplicateName'})
  }
    console.log('before hash')
    const hashedPassword = bcrypt.hashSync(password, 10);
    //creating a new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      phone,
    });
    

    try {
      console.log('entered try ')
      await newUser.save();
      
      const UnverifiedUser = await User.findOne({email});
      const id = UnverifiedUser._id;
      sendverifyMail(userName,email,id);
      req.session.userId = UnverifiedUser._id;
      console.log('user created success fully')
     
      res.status(201).json({message : 'Account created , check your email to verify your account',status : true})    
     

  } catch (error) { 
    next(error);
  }
};


const sendverifyMail = async(name,email,userId) => {
  try {
    const Otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    //calculate the expiration time
    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 600000); // 10 minutes in milliseconds

    const user  = await User.findOne({_id : userId});

    console.log(user)
    console.log(expirationTime)

    if(user){
      user.otp = Otp;
      user.otpExpiresAt = expirationTime;
     const UserWithOtp = await user.save();
    }else {
      console.log('user not found')
    }
  
//  /========================================== gmail ==========================================================/ //


  // const transporter =  nodemailer.createTransport({
  //     host: "smtp.gmail.com",
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: configEmail,
  //       pass: configPassword,
  //     },
  //   })


  // const mailOptions = {
  //   from: configEmail,
  //   to: email,
  //   subject: "Email Verification",
  //   html:`<p>Hi ${name}, <b>${Otp}</b> This is your Otp number to verify your email .</p>`,
  // };


  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return console.log(error.message);
  //   }
  //   console.log("success"); 
  // });

  //  /========================================== ethreal ==========================================================/ //

  console.log(Otp)

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jacey.nikolaus96@ethereal.email',
        pass: 'D9SXz7p47raHGGFDeS'
    }
});

 try{
        const info = await transporter.sendMail({
            from: 'jacey.nikolaus96@ethereal.email', // sender address
            to: email,
            subject: 'Email verification', // Subject line
            html: `<p>Hi ${name}, <b>${Otp}</b> This is your Otp number to verify your email .</p>`, // plain text body
          });
        
          console.log("Message sent: %s", info.messageId);
          
    }catch(err){
        throw new Error(err)
    }



    
   console.log('the mail has been sent successfully')
  } catch (error) {  
    console.log(error)

  }
}

export const  signin = async (req, res, next) => {

  const { email, password } = req.body;   
  try {
    //checks email
    const validUser = await User.findOne({ email });
    console.log(validUser, 'found User')
    if (!validUser) {
      return res.status(404).json({message : "User not found"});
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return res.status(401).json({message : 'Incorrect password, please try again', errorType : 'wrong credentials'});  
    

    if(!validUser.isVerified){
      req.session.userId = validUser._id;
      console.log('entered into the unauthenticated');
      return res.status(403).json({message : 'User is not verified',errorType : 'unauthenticated'})
    }
      
    const token = jwt.sign({id : validUser._id}, process.env.JWT_SECRET)
  
    //removing the password from the userInfo
    const {password : pass,...userInfo} = validUser._doc;


    res.cookie('access_token',token,{httpOnly : true}).status(200).json(userInfo)
  } catch (error) {
    next(errorHandler(404, "User Not Found"));
  }
};


export const validateOtpToVerifyUser = async(req,res,next) => {

   try {
     const { otp } = req.body;
     
     const userId = req.session.userId;

     console.log(userId)
     
     const userToverify = await User.findOne({_id : userId});
     
     if(!userToverify){
      console.log('inside the user not found')
      return res.status(404).json({message : 'User not found, try sign in',errorType : 'Invalid User'})
     }

      //checking the current date and time 
      const now = new Date();
      
      //check if the otp is expired
      
      if(userToverify.otp !== otp) {
        //wrong credentials
        
        return res.status(401).json({message : " The otp you entered doesn't match "})
      }

      if(userToverify.otpExpiresAt <= now){
        //otp is expired
        
        return res.status(403).json({message : 'The otp is expired , Resend a new One!'});

      }  
       
      //update the user into verified user
      userToverify.isVerified = true;
      
      //clear OTP value
      userToverify.otp = null;
      userToverify.otpExpiresAt = null; 
      
      await userToverify.save();

      return res.status(200).json({message : 'User is verified successfully',})

   } catch (error) {
    console.log('error')
    console.log(error)
   }
}

 

export const resendOtp = async(req,res) => {
 console.log('success from the backend');
 const userId = req.session.userId;
 const userForVerification = await User.findById({_id : userId});
 const name = userForVerification.userName;
 const email = userForVerification.email;
  
 console.log(userId,name,email);

  sendverifyMail(name,email,userId);
  console.log('the mail has been sent')

}