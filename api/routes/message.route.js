import express from 'express'
const router = express.Router()
import {newMessage,getUserMessages,updateMessagesToRead} from '../controllers/message.controller.js'
//adding a new message
router.post('/newMessage',newMessage)


//getting messages of a user
router.get('/getUserMessages/:conversationId',getUserMessages)


//marking all message as read while user open it
router.patch('/getUserMessages/mark-as-read/:conversationId',updateMessagesToRead)

export default router