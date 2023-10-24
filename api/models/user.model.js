import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    isBlocked :  {
        type : Boolean,
        default : false
    },
    //to get the extra infos like when the user is created and when the updations is done we gonna use timestamps
    


},{timestamps : true})

const User = mongoose.model('User',userSchema);

export default User;
