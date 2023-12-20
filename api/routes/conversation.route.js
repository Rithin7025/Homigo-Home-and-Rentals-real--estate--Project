import express from 'express'
const router = express.Router()
import {newConversation,getUserConversation,getConversationId} from '../controllers/conversation.controller.js'

//new conversation
router.post('/newConversation',newConversation)

//getting conversation of a user
router.get('/getUserConversation/:userId',getUserConversation)

//reteive conversation id

router.get('/getConversationId',getConversationId)

export default router