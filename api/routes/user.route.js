import express from 'express';
import {updateUserInfo,test , deleteUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router();

router.get('/test',test);
//update user
router.post('/updateUser/:id',verifyToken, updateUserInfo);
//delete user
router.delete('/deleteUser/:id',verifyToken, deleteUser);


export default router