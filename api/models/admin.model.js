import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    name :  {
        type : String,
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String
    }
}, {timestamps : true})

const Admin  = mongoose.model('Admin' , adminSchema)

export default Admin;