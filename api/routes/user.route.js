import express from 'express';
import {updateUserInfo,test} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router();

router.get('/test',test);
router.post('/updateUser/:id',verifyToken, updateUserInfo);


export default router