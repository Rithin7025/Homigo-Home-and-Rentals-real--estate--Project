import {Message} from '../models/Message.model.js'


export const newMessage = async(req,res) => {
    const newMessage = new Message(req.body)
    console.log(req.body,'here is the request body')
    console.log(newMessage,'here the new message')
    try {
        if(!newMessage){
            return res.status(404).json({message : 'no message found'})
        }

        const savedMessage =await newMessage.save()
        console.log('message saved',savedMessage)
        res.status(200).json(savedMessage)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getUserMessages = async(req,res)=>{
    const id = req.params.conversationId
    try {
        const messages = await Message.find({
            conversationId : id
        })
        return res.status(200).json(messages)
    } catch (error) {
        
    }
}