import Token from '../models/token.model.js'
import { startOfToday } from 'date-fns'

export const getTransationAmountAndToken = async(req,res) => {
    try {

        const numOfTransactions =  await Token.find({}).sort({createdAt : -1}).populate('propertyId','name').populate('buyerUserId','userName').populate('sellerUserId','userName')
        res.status(200).json(numOfTransactions)
    } catch (error) {
        console.log(error)
    }
}

export const getSalesOfTokenThisMonthRent = async(req,res) => {
    try {
            const currentMonth = new Date().getMonth() + 1
            const currentYear = new Date().getFullYear();


            const totalSalesOfThisMonthRent = await Token.aggregate([
                {
                    $match : {
                        $expr : {
                            $and : [
                                {$eq : [{ $month : '$paymentDate'},currentMonth]},
                                {$eq : [{ $year : '$paymentDate'},currentYear]},
                                { $eq : [ '$type' ,'rent']}
                            ]
                        }   
                    },

                },
                {
                    $group : {
                        _id : null ,
                        totalSales : {$sum : '$totalPrice'}
                    }
                }
            ])

           return res.status(200).json(totalSalesOfThisMonthRent)
    } catch (error) {
        console.log(error,'the errror------------>')
    }
}

// fn to find the sales of this month
export const getTotalSalesInThisMonth = async(req,res)=>{
    try {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        const totalSalesThisMonth = await Token.aggregate([
            {
                $match : {
                    $expr : {
                        $and : [
                            { $eq : [{$month : '$paymentDate'},currentMonth] },
                            {$eq : [{ $year : '$paymentDate'},currentYear]},
                            {$in : ['$type',['rent','sale']]}
                                
                           
                        ]
                    }
                }
            },
            {
                $group : {
                    _id : null,
                    totalSales : {$sum : '$totalPrice'}
                }
            },
            {
                $project : {
                    _id : 0,
                    totalSales : 1,
                }
            }
        ])

        console.log(totalSalesThisMonth,'🍇🍇🍇🍇🍇🍇')
        return res.status(200).json(totalSalesThisMonth)

    } catch (error) {
        
    }
}


// fn to find the sales of this day
export const getTotalSalesInThisDay = async(req,res)=>{
    try {
       const today = startOfToday();


        const totalSalesToday = await Token.aggregate([
         {
            $match : {
                paymentDate : {
                    $gte : today ,
                    $lt : new Date()
                },
                type : { $in : ['rent','sale']}
            }
         },
         {
            $group : {
                _id : null,
                totalSales : { $sum : '$totalPrice'},
            }
         },
         {
            $project  : {
                _id : 0,
                totalSales : 1
            }
         }
        ])

        console.log(totalSalesToday,'🍇🍇🍇🍇🍇🍇')
        return res.status(200).json(totalSalesToday)

    } catch (error) {
        console.log(error)
    }
}