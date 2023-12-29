import express from 'express'
const router = express.Router()

import {getTransationAmountAndToken} from '../controllers/token.controller.js'

router.get('/getTransationAmountAndToken',getTransationAmountAndToken)



export default router;