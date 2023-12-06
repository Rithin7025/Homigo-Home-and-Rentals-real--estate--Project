import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    }, 
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city : {
      type : String,
      required : true
    },
    district : {
      type : String,
      required : true
    },
    country : {
      type : String,
      default : 'India'
    },

    regularPrice: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    documentUrls: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    isBooked : {
      type : Boolean,
      default : false
    }
  },
  { timestamps: true }
);

export const Listing = mongoose.model("Listing", listingSchema);
