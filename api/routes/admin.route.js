import express from 'express';
import {adminSignin,listUsers} from '../controllers/admin.controller.js'

const router = express.Router();

//admin login
router.post('/adminLogin', adminSignin);

router.get('/listUsers', listUsers)


export default router;   