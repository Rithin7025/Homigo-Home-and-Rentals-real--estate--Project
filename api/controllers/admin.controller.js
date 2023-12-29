import Admin from '../models/admin.model.js'
import { errorHandler } from '../utils/errorHandler.js';
import bcryt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dontenv from 'dotenv';
import User from '../models/user.model.js'
import {Listing} from '../models/listing.model.js'
import mongoose from 'mongoose'
import {configEmail , configPassword} from '../config/config.js'
import nodemailer from "nodemailer";


dontenv.config()


export const adminSignin = async(req,res) => {
    const {email, password} = req.body
    console.log(req.body)
    
    const admin = await Admin.findOne({email});
    console.log(admin,'found')

    if(!admin){
        console.log('no admin')
        return res.status(404).json({message : `couldn't find admin`})
    }

    const adminPassword = await bcryt.compareSync(password, admin.password);
    if(!adminPassword){
        console.log(`couldn't bcrypt`)
       return res.status(401).json({message : 'wrong credentials'})
    }
    
    const token  = jwt.sign({id : admin._id,role :admin.role},process.env.JWT_SECRET);
    const { password : pass, ...adminInfo } = admin._doc 

    res.cookie('admin_token',token,{httpOnly: true}).status(200).json(adminInfo)


}


export const listUsers = async(req,res) => {
  
  if(req.role !== 'admin'){
    return res.status(403).json({message : "Access Denied. Insufficient privilages"})
   }
  const users = await User.find()
  res.json(users)
  
}


export const getUnverifiedListings = async(req,res)=>{
  if(req.role !== 'admin'){
    return res.status(403).json({message : "Access Denied. Insufficient privilages"})
   }
    try { 
        const getUnverifiedListings = await Listing.find({isVerified : false}).sort({createdAt : -1})

    res.status(200).json(getUnverifiedListings)
    } catch (error) {
        console.log(error)
    }
}


export const verifyListing = async(req,res) => {
    const id  = req.params.id;

    if(req.role !== 'admin'){
      return res.status(403).json({message : "Access Denied. Insufficient privilages"})
     }
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
          }
          const objectId = new mongoose.Types.ObjectId(id)
          console.log(objectId)

          const updateListing  = await Listing.findByIdAndUpdate(objectId,{ isVerified : true});

          const property = await Listing.findById(objectId)
          const propertyName = property.name;
          const userIdFromProperty = property.userRef;
          console.log('---------------------------------------------------')
          console.log('property and userId')
          console.log(property,userIdFromProperty)
          console.log('---------------------------------------------------')
          
          const user = await User.findById(userIdFromProperty);
          const userEmail = user.email
          const userName  = user.userName
          console.log('---------------------------------------------------')
          console.log('user and user Email')
          console.log(user,userEmail)
          console.log('---------------------------------------------------')
          
          sendPropertyVerifiedMail(userName,userEmail,propertyName)
          res.status(201).json(updateListing)
    } catch (error) {
        console.log(error)
    }
}

export const unblockUser = async(req,res) => {
    try {
    const userId  = req.params.userId;

    if(req.role !== 'admin'){
      return res.status(403).json({message : "Access Denied. Insufficient privilages"})
     }
   console.log('entered unblock user')
   console.log(userId)
   console.log('before')
   
   const user = await User.findByIdAndUpdate(userId,{ isBlocked : false})
      if(!user){
    res.status(404)
   }
    console.log('User',user)

   if(!userId){
    return res.status(404).json({message : 'No User'})
   }
   res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }

}

export const blockUser = async(req,res) => {
 try {
    const userId  = req.params.userId;
    console.log('block user called')
    console.log(req.role,'here si the rele')
    
   if(req.role !== 'admin'){
    return res.status(403).json({message : "Access Denied. Insufficient privilages"})
   }
   console.log(userId)
   console.log('before')
   
   const user = await User.findByIdAndUpdate(userId,{
    isBlocked : true
   })
   console.log(user)
      if(!user){
    res.status(404)
   }


   if(!userId){
    return res.status(404).json({message : 'No User'})
   }
   
   res.status(200).json(user)
 } catch (error) {
    console.log(error)
 }  

}

//==================================== node mailer ================================

const sendPropertyVerifiedMail = async(name,email,PropertyName) => {
    try {
  //  /========================================== gmail ==========================================================/ //
  
  
    const transporter =  nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: configEmail,
          pass: configPassword,
        },
      })
  
  
    const mailOptions = {
      from: configEmail,
      to: email,
      subject: "Property Verification",
      html:`<p>Congrats ${name},   This message is sent to you to announce that your property ${PropertyName} has been successfully verifed and listed on Homigo homes and rentals.Thank you for being a part of homigo!</p>`,
    };
  
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error.message);
      }
      console.log("success"); 
    });
  
    //  /========================================== ethreal ==========================================================/
  
  
     console.log('property has been verified')
    } catch (error) {  
      console.log(error)
  
    }
  }