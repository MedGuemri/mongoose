const UserModel =require('../models/userSchema')
const jwt=require("jsonwebtoken")
require('dotenv').config()

const isAuth = async (req,res,next)=>{
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")){
        return   res.status(400).json({msg:"token unauthorized"})
    }

    const token = req.headers.authorization.split(" ")[1]
    if(!token){
        return   res.status(400).json({msg:"token unauthorized"})
    }
    try{

        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
        const user= await UserModel.findById(decoded.id)
        if(!user){
            return res.status(400).json({msg:"toke is not valid"})
        }
        req.user={
            id:user._id,
            name:user.name,
            email:user.email
        }
        next()
    }
    catch(err){
        console.log(err)
        return res.status(400).json({msg:"erreur auth"})
    }

}

module.exports=isAuth