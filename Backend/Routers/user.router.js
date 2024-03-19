const express = require("express")
require("dotenv").config()
const {userModel} = require("../Models/user.model")
const jwt = require("jsonwebtoken")
const userRouter = express.Router()
userRouter.use(express.json())

userRouter.post("/signup",async(req,res)=>{
    const {email,username,password} = req.body

    try{
        if(!email || !username || !password){
            return res.status(500).send("please fill the all field")
        }
        const userpresent = await userModel.findOne({email})

        if(userpresent){
            return res.status(201).send("useralready present")
        }
        const user  = new userModel({username,email,password,role:"user"}) 
        await user.save()
        res.status(200).send("signup successfull")

    }catch(err){
       console.log(err.message)
       res.status(500).send("server error")
    }

})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try{
        if(!email || !password){
            return res.send("please fill the all field")
        }
        const userfind = await userModel.findOne({email})
       if(!userfind){
        return res.status(201).send("user is not present")
       }
       
        if(userfind.password != password){
            return res.status(201).send("password is not match")
        }

        const token = jwt.sign({data: userfind}, process.env.jwtkey, { expiresIn: '1h' });


        res.status(200).send({mes:"login  successfull",data:userfind,jwt:token})

    }catch(err){
       console.log(err.message)
       res.status(500).send("server error")
    }

})

module.exports= {userRouter}