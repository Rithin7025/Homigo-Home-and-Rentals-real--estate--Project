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
    },
    role : {
        type : String ,
        default : 'admin'
    }
}, {timestamps : true})

const Admin  = mongoose.model('Admin' , adminSchema)

export default Admin;