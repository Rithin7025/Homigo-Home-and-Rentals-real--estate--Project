import Token from '../models/token.model.js'

export const getTransationAmountAndToken = async(req,res) => {
    try {

        const numOfTransactions =  await Token.find({}).sort({createdAt : -1}).populate('propertyId','name').populate('buyerUserId','userName').populate('sellerUserId','userName')
        res.status(200).json(numOfTransactions)
    } catch (error) {
        
    }
}