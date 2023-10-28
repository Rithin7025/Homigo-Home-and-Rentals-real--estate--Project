import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken'
dotenv.config();

export const signup = async (req, res, next) => {
  console.log(req.body);
  const { userName, email, password, phone } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    return res
      .status(409)
      .json({ message: "User with the given mail already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    userName,
    email,
    password: hashedPassword,
    phone,
  });

  try {
    await newUser.save();
    //  sendverifyMail(userName,email)
    res.status(201).json({ message: "User Created successfully" });
  } catch (error) {
    next(error);
  }
};

// const sendverifyMail = async(name,email) => {
//   try {

//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       requireTLS: true,
//       auth: {
//         user: process.env.AUTH_EMAIL,
//         pass: process.env.AUTH_PASSWORD,
//       },
//     });

// console.log('entered mail');
//     let mailOptions = {
//       from: "00testcase00@gmail.com",
//       to: email,
//       subject: "Email Verification",
//       html: `Dear ${name},\n\nEnter <b>hey</b> in the app to verify you email address and complete the process.`,
//     };

//     transporter.verify((error,success)=>{
//       if(error){
//         console.log(error)
//       }else{
//         console.log('redy for message');

//       }
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }

export const  signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //checks email
    const validUser = await User.findOne({ email });
    
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    //

    
    //
    const validPassword = bcrypt.compareSync(password, validUser.password);
    
    


    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    const token = jwt.sign({id : validUser._id}, process.env.JWT_SECRET)
  
    
    const {password : pass,...userInfo} = validUser._doc;


    res.cookie('access_token',token,{httpOnly : true}).status(200).json(userInfo)
  } catch (error) {
    next(errorHandler(404, "User Not Found"));
  }
};
