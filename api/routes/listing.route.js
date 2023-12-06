import express from 'express'
const router = express.Router();
import {createListing, getUserListings,getUserListing,deleteUserListing,updateUserListing,getListing,getListings,bookToken,paymentSuccessVerification,getIsBookedDetails} from '../controllers/listing.controller.js'
import {verifyToken } from '../utils/verifyUser.js'


//create a listing
router.post('/createListing', verifyToken,  createListing);

//get userListings 
router.get('/listings/:id',verifyToken,getUserListings)

//get listingforDetailPage
router.get('/getUserListing/:id',getUserListing)

//delete a listing
router.delete('/deleteUserListing/:listingId',verifyToken , deleteUserListing)

//updata listing
router.post('/updateUserListing/:id',verifyToken , updateUserListing)

//get listing
router.get('/getListing/:id',getListing)

//search listing
router.get('/getListings',getListings)

//token booking
router.post('/tokenBooking',bookToken)

//verification for payment
router.post('/success',paymentSuccessVerification)

//to check if the property is already booked
router.get('/getIsBookedDetails/:id',getIsBookedDetails)



export default router