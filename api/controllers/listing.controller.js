import { Listing } from "../models/listing.model.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
import Razorpay from 'razorpay'
import shortid from "shortid";
import crypto from 'crypto'
import Token from '../models/token.model.js'
import {configEmail , configPassword} from '../config/config.js'
import nodemailer from 'nodemailer'
import User from "../models/user.model.js";




const instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORAY_SECRET,
});

export const createListing = async (req, res) => {

  try {
    
    console.log(
      "entered in create LIsting--------------------------------------------"
    );
    console.log(req.user.id);
    const userRef = req.user.id;

    if (!userRef) {
      return res.status(404).json({ message: "No user found, please login" });
    }
    //discount price is different
    
    const country = "India";
    const {
      address,
      bathrooms,
      bedrooms,
      city,
      description,
      discountPrice,
      district,
      docsUrls,
      furnished,
      imageUrls,
      name,
      offer,
      parking,
      regularPrice,
      type,
    } = req.body;

    const newListing = new Listing({
      name,
      description,
      address,
      city,
      district,
      regularPrice,
      discountedPrice: discountPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      offer,
      imageUrls,
      documentUrls: docsUrls,
      type,
      userRef,
    });

    const savedListing = await newListing.save();

    console.log(newListing, "created");
    return res.status(201).json(newListing);
  } catch (error) {
    console.log(error.message);
  }
};


export const getUserListings = async(req,res) => {
   const id = req.params.id;
   try{
    if(req.user.id === id){
        const listings = await Listing.find({userRef : id,isVerified : true});
        res.status(200).json(listings)
    }else{
        return res.status(404).json({message : 'Not authorised , login again'})
    }

   }catch(error){
     console.log(error)
     return res.status(404).json({message : 'Not authorised , login again'})

   }
}

export const getUserListing = async(req,res) => {
  console.log('entered in getUser backend')
  const id  = req.params.id
  console.log(id)
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    const objectId =new mongoose.Types.ObjectId(id)
    console.log(objectId)
    console.log('before finding')
    const unverifiedListing = await Listing.findById(objectId)
    console.log('after finding')
    if(!unverifiedListing){
      return res.status(404).json({message : 'Property not found'})
    }
    res.status(200).json(unverifiedListing)

  } catch (error) {
    console.log(error.message,'teh error from backedn')
  }
}

export const deleteUserListing = async(req,res) => {
  console.log('entered into deleteUserListng')
  console.log(req.params.listingId)
  console.log(req.user)
  console.log('-----------------------------------')
  const listing = await Listing.findById(req.params.listingId);
  if(!listing){
    return res.status(404).json({errorType : 'cannot find this listing'})
  }
  if(req.user.id !== listing.userRef.toString()){
    return res.status(401).json({message : 'cannot authorise , please login again'})
  }
   try {

    await Listing.findByIdAndDelete(req.params.listingId)
    res.status(200).json({message : 'success'})
   } catch (error) {
    console.log(error)
   }
}

export const updateUserListing = async(req,res)=> {
  console.log('entered in updateUserListig------------------------------------------------------------------//////')

  console.log(req.params.id);
  console.log(req.body)

 try { 
  const listing = await Listing.findById(req.params.id)
  
   if(req.user.id !== listing.userRef){
     return res.status(403).json({message : 'cannot update, not authorised'})
   }
  const updatedlisting = await Listing.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true});
  if(!updatedlisting){
    return res.status(404).json({message : 'listing not found'})
  }
  console.log(listing,'listing got')
  res.status(200).json(listing) 
 } catch (error) {
  console.log('entered error')
  console.log(error)
 }
}

export const getListing = async(req,res) => {
  try {
    console.log(req.params.id)
    console.log('entered in the getListing')
    const listing = await Listing.findById(req.params.id)
    console.log(listing)
    if(!listing){
      return res.status(404).json({message : 'Not found'})
    }
    return res.status(200).json(listing)
  } catch (error) {
    console.log(error)
  }
}

export const getListings = async(req,res) => {
  try {

    console.log(req.query,'here are the queries')
    //if there is a limit parse it other wise limit 9
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0 ;
    let offer = req.query.offer;
    
    //checking the offer from home and from the search page // from home the offer is 'undefined' so checking both condition
    if(offer === undefined || offer === 'false'){
      offer = { $in : [false , true]}
    }

    let furnished = req.query.furnished;
    console.log(furnished)
    if(furnished === undefined || furnished === 'false'){
      furnished = { $in : [false , true]}
    }

    let parking = req.query.parking;
    console.log(parking)
    if(parking === undefined || parking === 'false'){
      parking = { $in : [false,true]}
    }
    let type = req.query.type;
    console.log(type)
    if(type === undefined || type === 'all'){
      type = { $in : ['sale','rent']} ;
    }
   //if there is a term to search search or empty
    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt' ; 
    const order = req.query.order || 'desc'
    const listings = await Listing.find({
      //'i' means doesn't check if uppercase or lowercase
     name : {$regex : searchTerm , $options : 'i'},
     offer,
     furnished,
     parking,
     type
    }).sort({
      [order] : order
    }).limit(limit).skip(startIndex); 

    return res.status(200).json(listings)
  } catch (error) {
      console.log(error)
      console.log('in the error')
  }
}

export const bookToken = async(req,res) => {
  const {amount}  = req.body;
  const roundedAmount = Math.floor(amount)
   const payment_capture = 1;
   const currency = "INR";

   const options = {
    amount: roundedAmount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

    try {
      console.log('entered try in book token')
      console.log(options,'here are the options ')
      const order = await instance.orders.create(options)
      console.log(order , 'here the order has been received')
      
      if (!order) return res.status(500).send("Some error occured");


      console.log('here options are created')
      res.status(200).json(order);
    } catch (error) {
      res.status(500).send(error);
      console.log(error)
    }
}

export const paymentSuccessVerification = async(req,res) => {
  console.log('entered verification')
  try {
    // getting the details back from our font-end
    const {
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
        listing,
        userId,
        amount
    } = req.body;
    console.log('----------------------------------------req.body')
    console.log(req.body)
    console.log('----------------------------------------req.body')
   
    // Creating our own digest
    // The format should be like this:
    // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
    const shasum = crypto.createHmac("sha256", process.env.RAZORAY_SECRET); 
    console.log(shasum,'shasum')
   const data =   shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    console.log(data)
    const digest = data.digest("hex");
    console.log(razorpaySignature)
        console.log(digest,'digest')
        
        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)  return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        //  SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
        console.log('success')

        const threeMonthsLater  = new Date();
        threeMonthsLater.setMonth(threeMonthsLater.getMonth()+3)
        const newToken = new Token({
             propertyId : listing._id,
             buyerUserId : userId,
             sellerUserId : listing.userRef,
             totalPrice : amount /100,
             expiryDate : threeMonthsLater
        })
        //saving the new token

         await newToken.save();
        const updateListing = await Listing.findByIdAndUpdate(listing._id,{isBooked : true});
        const seller = await User.findById(newToken.sellerUserId)
        const sellerName = seller.userName;
        const sellerEmail = seller.email;
        
        console.log(seller,'just got the seller')
        const buyer = await User.findById(newToken.buyerUserId);
        const buyerName = buyer.userName;
        const buyerEmail = buyer.email;
        console.log(buyer, 'just got the buyer')
        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });


    } catch (error) {
      console.log(error)
        res.status(500).send(error)
    }

}

export const getIsBookedDetails = async(req,res)=>{
   const propertyId = req.params.id;
   const tokenbooked = await Token.findOne({propertyId}) 
   if(!tokenbooked) {
    return res.status(404).json({message : 'booking not found'})
   }
   return res.status(200).json(tokenbooked)
}

export const getToken = async(req,res) => {
   const userId = req.params.id;
   if(!userId){
    return res.status(404).json({message : 'userId not found'})
   }

   try {
    const tokens = await Token.find({buyerUserId : userId}).populate('propertyId','name type')
    console.log('----------------------------------------> token')
    console.log(tokens)
    console.log('---------------------------------------- > toknen')
    if(!tokens || tokens.length === 0){

      return res.status(204).json({message : 'empty tokens'})

    }
    return res.status(200).json(tokens)
   } catch (error) {
    console.log(error)
   }
}



const sendTokenBookedMail = async(name,email,PropertyName,buyerName,buyerEmail) => {
  try {

//  /========================================== gmail ==========================================================/ //


  const transporter =  nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: configEmail,
        pass: configPassword,
      },
    })


  const mailOptions = {
    from: configEmail,
    to: email,
    subject: "Property Verification",
    html:`<p>Congrats ${name},   This message is sent to you to announce that your property ${PropertyName} has a successful token registration by ${buyerName}, you can contact buyer @ ${buyerEmail}</p>`,
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error.message);
    }
    console.log("success"); 
  });

  //  /========================================== ethreal ==========================================================/


   console.log('property has been verified')
  } catch (error) {  
    console.log(error)

  }
}


//to fetch listings
export const getEveryListings = async(req,res)=>{
  try {
    console.log('entered in to the getEveryListing foa admin')
    const Listings = await Listing.find()
   return res.status(200).json(Listings)
  } catch (error) {
    console.log(error)
  }
}