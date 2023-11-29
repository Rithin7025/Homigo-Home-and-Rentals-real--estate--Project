import express from 'express';
import {adminSignin,listUsers,getUnverifiedListings,verifyListing,blockUser,unblockUser} from '../controllers/admin.controller.js'

const router = express.Router();

//admin login
router.post('/adminLogin', adminSignin);
//get users
router.get('/listUsers', listUsers)

//get unverified listings
router.get('/getUnverifiedListings', getUnverifiedListings)

//post verifyListing
router.post('/verifyListing/:id',verifyListing)

//block user
router.post('/blockUser/:userId',blockUser)

//unblock User
router.post('/unblockUser/:userId',unblockUser)


export default router;   