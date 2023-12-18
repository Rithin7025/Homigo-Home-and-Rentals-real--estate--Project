import express from 'express'
const router = express.Router()
import {newConversation,getUserConversation} from '../controllers/conversation.controller.js'

//new conversation
router.post('/newConversation',newConversation)

//getting conversation of a user
router.get('/getUserConversation/:userId',getUserConversation)



export default router