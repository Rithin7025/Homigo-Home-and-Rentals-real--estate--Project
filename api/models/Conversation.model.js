import mongoose from 'mongoose'


const conversationSchema = new mongoose.Schema({
   
    members : {
        type : Array,
    },
    //to track timestamp of last message
    lastMessage : {
        type : Date,
        default : null
    }

},{timestamps : true})

export const Conversation = mongoose.model('Conversation',conversationSchema);