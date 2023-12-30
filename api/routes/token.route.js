import express from 'express'
const router = express.Router()

import {getTransationAmountAndToken,
    getTotalSalesInThisMonth, 
    getSalesOfTokenThisMonthRent,
    getTotalSalesInThisDay ,
    getTotalSalesOfLastWeek,
    getTotalSalesOfPreviousMonth,
    getSalesOfTokenThisMonthSale
} from '../controllers/token.controller.js'

router.get('/getTransationAmountAndToken',getTransationAmountAndToken)

//to fetch the token which has type rent
router.get('/getSalesOfTokenThisMonth',getSalesOfTokenThisMonthRent)


//to fetch the token which has type sale
router.get('/getSalesOfTokenThisMonthSale',getSalesOfTokenThisMonthSale)

//to fetch the sales(rent,sale) in this month
router.get('/getTotalSalesInThisMonth',getTotalSalesInThisMonth)

// to fetch the sales of today
router.get('/getTodaySales',getTotalSalesInThisDay)


// to fetch the sales of today
router.get('/getSalesOfLastWeek',getTotalSalesOfLastWeek)

// to fetch the sales of Previous month
router.get('/getSalesOfLastMonth',getTotalSalesOfPreviousMonth)

export default router;