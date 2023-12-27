import {Message} from '../models/Message.model.js'
import {errorHandler} from '../utils/errorHandler.js'
import { Conversation } from '../models/Conversation.model.js'
 

export const newMessage = async(req,res,next) => {
    const newMessage = new Message(req.body)
    try {
        if(!newMessage){
            const error = errorHandler(404,'no message found');
            throw error;
        }

        const savedMessage =await newMessage.save()
        console.log('message saved',savedMessage)




        //updating the converstion's timestamp for sorting the chat
      const updatedtime =    await Conversation.findOneAndUpdate(
           { _id : newMessage.conversationId} ,
           {updatedAt : new Date()},
           {new  : true}
        )
        res.status(200).json(savedMessage)
    } catch (error) {
        next(error)
    }
}

export const getUserMessages = async(req,res,next)=>{
    const id = req.params.conversationId
    try {
        const messages = await Message.find({
            conversationId : id
        })
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).json({message : 'could not find messages'})
    }
}

export const updateMessagesToRead = async(req,res) => {
    const id = req.params.conversationId;

    console.log('---------------------------------------entered updateMessages to read')
    if(!id){
        return res.status(403).json({error : 'could not parse id'})
    }
     try {

      const result = await Message.updateMany({conversationId : id},{$set : {read : true}})

      return res.status(200).json(result)
     } catch (error) {
        return res.status(500).json(error.message)
     }
}