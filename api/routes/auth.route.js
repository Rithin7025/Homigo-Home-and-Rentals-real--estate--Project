import express from 'express';
const router = express.Router();
import { signup,signin } from '../controllers/auth.controller.js';



//signup route
router.post('/signup',signup);
//sign in route

router.post('/signin',signin);

export default router