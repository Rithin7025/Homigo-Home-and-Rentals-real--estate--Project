import express from 'express';
const router = express.Router();
import { signup,signin,validateOtpToVerifyUser,resendOtp,googleAuth } from '../controllers/auth.controller.js';



//signup route
router.post('/signup',signup);

//sign in route
router.post('/login',signin);

//verify otp
router.post('/otp' , validateOtpToVerifyUser);

//resend otp
router.post('/resendOtp',resendOtp);


//google auth
router.post('/google', googleAuth);
export default router