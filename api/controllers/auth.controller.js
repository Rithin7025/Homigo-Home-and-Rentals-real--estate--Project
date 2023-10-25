import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import {errorHandler} from '../utils/errorHandler.js'

export const signup = async(req, res,next) => {
  const { userName, email, password,phone } = req.body;
  const hashedPassword = bcrypt.hashSync(password,10);

  const newUser = new User({
    userName,
    email,
    password : hashedPassword,
    phone
  });

  try {
    
      await newUser.save() ;
      res.status(201).json({message : "user Created successfully"})
  } catch (error) {
    next(error)    
  }
};
