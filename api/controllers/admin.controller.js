import Admin from '../models/admin.model.js'
import { errorHandler } from '../utils/errorHandler.js';
import bcryt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dontenv from 'dotenv';
import User from '../models/user.model.js'
dontenv.config()


export const adminSignin = async(req,res,next) => {
    const {email, password} = req.body
    console.log(req.body)
    
    let admin = await Admin.findOne({email});
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
    res.cookie('admin_token',token,{httpOnly: true}).status(200).json(admin)


}


export const listUsers = async(req,res) => {
  const users = await User.find()
  console.log(users)
  res.json(users)

console.log('users here')
}