import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'

export const test = (req,res)=>{
    res.json({
        messsage : 'api is working'
    })
    console.log('return')
}

export const updateUserInfo = async(req,res) => {
    

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

    console.log(updateUser)

   const {password, ...rest} = updateUser._doc;
   res.status(200).json(rest)

   } catch (error) {
    console.log(error)
   }

}


export const deleteUser = async(req,res) => {
    //req.user  from the jwt middleware
    if(req.user.id !== req.params.id) return res.status(401).json({message : 'not authorised'})
    try {
        await User.findByIdAndDelete(req.params.id)
        //delete the user and clear the cookie
        return res.status(200).json({message : 'User has been deleted'}).clearCookie('access_token');
    } catch (error) {
        
    }
}


export const getLandLord  = async(req,res) => {
    try {
      console.log(req.params.id)
      const user = await User.findById(req.params.id)
      console.log(user)
      if (!user){
        res.status(404).json({message : 'user not found'})
      }
    
      const {password : pass, ...rest} = user._doc
      res.status(200).json(rest)
    } catch (error) { 
      console.log(error)
    // return  res.status(error.response.status).json(error.status)
    }
  }

  export const findUser = async(req,res)=>{
    const id = req.params.id
    if(!id){
      return res.status(404).json({error : 'id not found'})
    }
    
    try {
      console.log('from user page,entered try in find user')
      const user = await User.findById(id);
      if(!user){
        return res.status(404).json({message : 'user not found'})
      }
      return res.status(200).json(user)
    } catch (error) {
      console.log(error)
      return res.status(404).json(error)

    }
  }