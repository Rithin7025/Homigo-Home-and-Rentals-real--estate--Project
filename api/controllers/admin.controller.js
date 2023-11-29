import Admin from '../models/admin.model.js'
import { errorHandler } from '../utils/errorHandler.js';
import bcryt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dontenv from 'dotenv';
import User from '../models/user.model.js'
import {Listing} from '../models/listing.model.js'
import mongoose from 'mongoose'
dontenv.config()


export const adminSignin = async(req,res,next) => {
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
    
    const token  = jwt.sign({id : admin._id},process.env.JWT_SECRET);
    const { password : pass, ...adminInfo } = admin._doc 

    res.cookie('admin_token',token,{httpOnly: true}).status(200).json(adminInfo)


}


export const listUsers = async(req,res) => {
  const users = await User.find()
  console.log(users)
  res.json(users)

console.log('users here from admin controller list users')
}


export const getUnverifiedListings = async(req,res)=>{
    try { 
        console.log('entered in admin getunverify')
        const getUnverifiedListings = await Listing.find({isVerified : false}).sort({createdAt : -1})

    res.status(200).json(getUnverifiedListings)
    console.log(getUnverifiedListings)
    } catch (error) {
        console.log(error)
    }
}


export const verifyListing = async(req,res) => {
    const id  = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
          }
          const objectId =new mongoose.Types.ObjectId(id)
          console.log(objectId)

          const updateListing  = await Listing.findByIdAndUpdate(objectId,{ isVerified : true});
          console.log(updateListing);
          res.status(201).json(updateListing)
    } catch (error) {
        console.log(error)
    }
}

export const unblockUser = async(req,res) => {
    try {
    const userId  = req.params.userId;
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