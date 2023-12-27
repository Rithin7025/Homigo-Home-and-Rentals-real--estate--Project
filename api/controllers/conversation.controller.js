import User from "../models/user.model.js";
import { Conversation } from "../models/Conversation.model.js";
import { Message } from "../models/Message.model.js";


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
    if(!userId){
        
        console.log('no user Id')
        res.status(404).json({message : 'No conversation for this user'})
    }
    try {
        //check the user id is inside the array of members
         const conversations = await Conversation.find({
            members : {$in : [userId]}
         }).sort({"updatedAt" : -1})

         //finding the unread conversation
         const conversaionWithUnreadCount = await Promise.all(  
            conversations.map(async(conversation)=>{
                const unreadCount = await Message.countDocuments({conversationId : conversation._id,read : false})
                return {
                    //appending the count along with the document
                    ...conversation.toObject(),
                    unreadCount
                }
            })
         ) 
         console.log(conversaionWithUnreadCount,'convesation with unread count  ')
         if(!conversations){
             res.status(401).json({message : 'no conversation'})
         }

         return  res.status(200).json(conversaionWithUnreadCount)
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