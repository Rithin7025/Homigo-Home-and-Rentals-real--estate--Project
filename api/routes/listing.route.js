import express from 'express'
const router = express.Router();
import {createListing} from '../controllers/listing.controller.js'
import {verifyToken } from '../utils/verifyUser.js'


router.post('/createListing', verifyToken,  createListing);


export default router