import mongoose from 'mongoose' 

const tokenSchema = new mongoose.Schema({
    propertyId : {
        type : mongoose.Types.ObjectId,
        ref : 'Listing',
        required : true
    },
    buyerUserId : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    },
    sellerUserId : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    },
    totalPrice : {
        type : Number,
        required : true
    },
    paymentDate : {
        type : Date,
        default : Date.now()
    },
   expiryDate : {
        type : Date,
        required : true
    },
    type : {
        type : String,
    }
},{timestamps : true})

const Token = mongoose.model('Token',tokenSchema);
export default Token;
