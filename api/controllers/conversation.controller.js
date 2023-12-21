import User from "../models/user.model.js";
import { Conversation } from "../models/Conversation.model.js";


export const newConversation = async(req,res)=>{
    const {senderId,receiverId} = req.body;
   try {
    const newConversation = new Conversation(
        {
            members : [senderId,receiverId]
        }
    )
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation)
   } catch (error) {
    res.status(500).json(error)
   }
    
}

export const getUserConversation = async (req,res) => {

    const userId = req.params.userId;
    console.log(userId,'here is the user id')
    if(!userId){
        console.log('no user Id')
        res.status(404).json({message : 'No conversation for this user'})
    }
    try {
        console.log('entered try in getConversation')
        //check the user id is inside the array of members
         const conversations = await Conversation.find({
            members : {$in : [userId]}
         })
         if(!conversations){
             res.status(401).json({message : 'no conversation'})
         }

         res.status(200).json(conversations)
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'error'})
    }
}

export const getConversationId = async (req,res) => {
    console.log('entered get Conversation')
 const senderId = req.query.senderId;
 const receiverId = req.query.receiverId;

 const conversationId = await Conversation.findOne({members: {$all : [senderId,receiverId]}});
 console.log(conversationId)
 if(conversationId){
    res.status(200).json(conversationId)
 }
 console.log(conversationId,'the conversation id')
}