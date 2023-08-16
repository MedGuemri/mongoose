
const UserModel =require('../models/userSchema')
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")


const userController = {
    register : async (req, res)=>{
        const {name, email,password}=req.body
        if(!name||!email||!password){
            return res.status(400).json({msg:"pls enter all informations"})
        }

        const user = await UserModel.findOne({email})
        if(user){
            return res.status(400).json({msg:"user already exisite"})
        }
        const salt= await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(password,salt)
        const newUser= await UserModel.create({
            name,
            email,
            password:hashedpassword

        })
        if(!newUser){
            return res.status(400).json({msg:"user not created"}) 
        }
        res.status(201).json({
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email,
           token : genToken(newUser._id),
            
        })
    },

    login: async (req,res)=>{
        const {email,password}= req.body
        if(!email || !password){
            return res.status(400).json({msg:"pls enter all informations"})
        }

        const user = await UserModel.findOne({email})
        if(!email){
            return res.status(400).json({msg:"user dose not exsiste"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({msg:"password invalid"})
        }

        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:genToken(user._id)
        })
    },

    me:async(req,res)=>{
        res.status(200).json(req.user)
    }

    
    
    
}
const genToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"10d"})
}

module.exports=userController 