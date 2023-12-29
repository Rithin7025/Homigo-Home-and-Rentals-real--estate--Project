import express from 'express'
import {verifyToken } from '../utils/verifyUser.js'

const router = express.Router();
import {
    createListing,
     getUserListings,
     getUserListing,
     deleteUserListing,
     updateUserListing,
     getListing,
     getListings,
     bookToken,
     paymentSuccessVerification,
     getIsBookedDetails,
     getToken,
     getEveryListings,
     blockProperty,
     unblockProperty,
     getRentListings,
     getSaleListings
    } from '../controllers/listing.controller.js'


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

//to fetch token 
router.get('/getToken/:id',getToken);

//ro fetch every listing ever made
router.get('/getEveryListings',getEveryListings)

//block a property
router.patch('/blockProperty/:propertyId',blockProperty)

//unblock a property
router.patch('/unblockProperty/:propertyId',unblockProperty)

//to fetch listings of rent
router.get('/getRentListings',getRentListings)


//to fetch listings of rent
router.get('/getSaleListings',getSaleListings)


export default router