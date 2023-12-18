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
    console.log(userId)
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
         console.log('after conversation')
         if(!conversations){

             res.status(401).json({message : 'no conversation'})
         }

         console.log(conversations)
         res.status(200).json(conversations)
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'error'})
    }
}