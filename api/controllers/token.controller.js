import Token from '../models/token.model.js'
import { endOfMonth, startOfMonth, startOfToday, subDays, subMonths } from 'date-fns'

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
export const getSalesOfTokenThisMonthSale = async(req,res) => {
    try {
            const currentMonth = new Date().getMonth() + 1
            const currentYear = new Date().getFullYear();


            const totalSalesOfThisMonthSale = await Token.aggregate([
                {
                    $match : {
                        $expr : {
                            $and : [
                                {$eq : [{ $month : '$paymentDate'},currentMonth]},
                                {$eq : [{ $year : '$paymentDate'},currentYear]},
                                { $eq : [ '$type' ,'sale']}
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
            console.log('got the sales of this month  ❤️❤️❤️=',totalSalesOfThisMonthSale)

           return res.status(200).json(totalSalesOfThisMonthSale)
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

        return res.status(200).json(totalSalesToday)

    } catch (error) {
        console.log(error)
    }
}


//fn to find the sales of last week 
export const getTotalSalesOfLastWeek = async(req,res)=>{
    try {
        const lastWeek = startOfToday(subDays(new Date(), 7));
        lastWeek.setUTCHours(0, 0, 0, 0);

            console.log('lastWeek : ',lastWeek.toISOString())
        const totalSalesLastWeek = await Token.aggregate([
            {
                $match : {
                    paymentDate : {
                        $gte : lastWeek,
                        $lt : new Date()
                    },
                    type : {$in : ['rent','sale']}
                }
            },
            {
                $group : {
                    _id : null ,
                    totalSales : { $sum : '$totalPrice'}
                }
            },
            {
                $project : {
                    _id : 0,
                    totalSales : 1
                }
            }
        ])

        return res.status(200).json(totalSalesLastWeek)
    } catch (error) {
        console.log(error)
    }
} 

//fn to find the sales of previous month 
export const getTotalSalesOfPreviousMonth = async (req, res) => {
    try {
        const firstDayOfPreviousMonth = startOfMonth(subMonths(new Date(), 1));
        firstDayOfPreviousMonth.setUTCHours(0, 0, 0, 0);
        
        const lastDayOfPreviousMonth = endOfMonth(subMonths(new Date(), 1));
        lastDayOfPreviousMonth.setUTCHours(0, 0, 0, 0);
  
        console.log('firstDayOfPreviousMonth: ---------------------------', firstDayOfPreviousMonth.toISOString());
        console.log('lastDayOfPreviousMonth:-----------------------------', lastDayOfPreviousMonth.toISOString());

        const totalSalesPreviousMonth = await Token.aggregate([
            {
                $match: {
                    paymentDate: {
                        $gte: firstDayOfPreviousMonth,
                        $lt: lastDayOfPreviousMonth
                    },
                    type: { $in: ['rent', 'sale'] }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: '$totalPrice' }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalSales: 1
                }
            }
        ]);

        console.log(totalSalesPreviousMonth, '🥂🥂🥂🥂🥂🥂🥂');
        return res.status(200).json(totalSalesPreviousMonth);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
