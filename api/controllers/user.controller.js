import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'

export const test = (req,res)=>{
    res.json({
        messsage : 'api is working'
    })
    console.log('return')
}

export const updateUserInfo = async(req,res) => {

    console.log(req.cookies,'the cookie')
    if(req.user.id !== req.params.id) return res.status(401).json({message : 'not authorised'})
   try {
    if(req.body.password){
        req.body.password = await bcryptjs.hashSync(req.body.password,10)
    }
   const updateUser = await User.findByIdAndUpdate(req.params.id,{
    $set : {
        userName : req.body.userName,
        email : req.body.email,
        password : req.body.password,
        avatar  : req.body.avatar
    } 
   }, {new : true})


   const {password, ...rest} = updateUser._doc;
   res.status(200).json(rest)

   } catch (error) {
    
   }

}


