import express from 'express'
const router = express.Router()
import {newMessage,getUserMessages} from '../controllers/message.controller.js'
//adding a new message
router.post('/newMessage',newMessage)


//getting messages of a user
router.get('/getUserMessages/:conversationId',getUserMessages)


export default router