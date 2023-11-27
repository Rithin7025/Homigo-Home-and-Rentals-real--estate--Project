import express from 'express';
import {adminSignin,listUsers,getUnverifiedListings,verifyListing} from '../controllers/admin.controller.js'

const router = express.Router();

//admin login
router.post('/adminLogin', adminSignin);
//get users
router.get('/listUsers', listUsers)

//get unverified listings
router.get('/getUnverifiedListings', getUnverifiedListings)

//post verifyListing
router.post('/verifyListing/:id',verifyListing)


export default router;   