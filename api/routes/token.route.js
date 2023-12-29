import express from 'express'
const router = express.Router()

import {getTransationAmountAndToken,getTotalSalesInThisMonth, getSalesOfTokenThisMonthRent,getTotalSalesInThisDay} from '../controllers/token.controller.js'

router.get('/getTransationAmountAndToken',getTransationAmountAndToken)

router.get('/getSalesOfTokenThisMonth',getSalesOfTokenThisMonthRent)

//to fetch the sales in this month
router.get('/getTotalSalesInThisMonth',getTotalSalesInThisMonth)

// to fetch the sales of today
router.get('/getTodaySales',getTotalSalesInThisDay)



export default router;