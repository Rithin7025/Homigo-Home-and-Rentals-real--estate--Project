import express from 'express';
import {adminSignin,listUsers,getUnverifiedListings,verifyListing,blockUser,unblockUser} from '../controllers/admin.controller.js';
import { verifyAdminToken } from '../utils/verifyAdmin.js';

const router = express.Router();

//admin login
router.post('/adminLogin', adminSignin);
//get users
router.get('/listUsers',verifyAdminToken, listUsers)

//get unverified listings
router.get('/getUnverifiedListings',verifyAdminToken, getUnverifiedListings)

//post verifyListing
router.post('/verifyListing/:id',verifyAdminToken,verifyListing)

//block user
router.post('/blockUser/:userId',verifyAdminToken,blockUser)

//unblock User
router.post('/unblockUser/:userId',verifyAdminToken,unblockUser)


export default router;   