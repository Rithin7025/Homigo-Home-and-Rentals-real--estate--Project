import { Listing } from "../models/listing.model.js"

    export const createListing = async(req,res) => {
        try {

            console.log('entered in create LIsting--------------------------------------------')
            console.log(req.user.id)
            const userRef = req.user.id ;

            if(!userRef){
                return res.status(404).json({message : 'No user found, please login'})
            }
            //discount price is different
            const country = 'India'
            const {address,bathrooms,bedrooms,city,description,discountPrice,district,docsUrls,furnished,
            imageUrls,name,offer,parking,regularPrice,type} = req.body;
     
            
            const newListing = new Listing({
                name,
                description,
                address,
                city,
                district,
                regularPrice,
                discountedPrice : discountPrice,
                bathrooms,
                bedrooms,
                furnished,
                parking,
                offer,
                imageUrls,
                documentUrls : docsUrls,
                type,
                userRef 
            })

         const savedListing = await newListing.save();

            console.log(newListing,'created')
            return res.status(201).json(newListing)
        } catch (error) {
            console.log(error.message)
        }
    }