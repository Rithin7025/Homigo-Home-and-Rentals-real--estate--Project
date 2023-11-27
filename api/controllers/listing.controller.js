import { Listing } from "../models/listing.model.js";
import mongoose from "mongoose";

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
  console.log('entered in updateUserListig')
  console.log(req.params.id);
  console.log(req.body)

 try {
  const listing = await Listing.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true});
  console.log(listing,'listing got')
  res.status(200).json(listing) 
  if(!listing){
    return res.status(404).json({message : 'listing not found'})
  }
  if(req.user.id !== listing.userRef){
    return res.status(403).json({message : 'cannot update, not authorised'})
  }
 } catch (error) {
  console.log('entered error')
  console.log(error)
 }
}

export const getListing = async(req,res) => {
  try {
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
    //if there is a limit parse it other wise limit 9
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0 ;
    let offer = req.query.offer;

    //checking the offer from home and from the search page // from home the offer is 'undefined' so checking both condition
    if(offer === undefined || offer === 'false'){
      offer = { $in : [false , true]}
    }

    let furnished = req.query.furnished;
    if(furnished === undefined || furnished === 'false'){
      furnished = { $in : [false , true]}
    }

    let parking = req.query.parking;

    if(parking === undefined || parking === 'false'){
      parking = { $in : [false,true]}
    }

    let type = req.query.type;
    if(type === undefined || type === 'all'){
      type = { $in : ['sale','rent']} ;
    }
   //if there is a term to search search or empty
    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt' ; 
    const order = req.query.order || 'desc'

    const listings = await Listing.find({
      //i means doesn't check if uppercase or lowercase
     name : {$regex : searchTerm , $options : 'i'},
     offer,
     furnished,
     parking,
     type
    }).sort({
      [order] : order
    }).limit(limit).skip(startIndex)
    
    return res.status(200).json(listings)
  } catch (error) {
      console.log(error)
  }
}