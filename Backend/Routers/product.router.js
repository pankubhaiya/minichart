const express = require("express")
require("dotenv").config()
const {productModel} = require("../Models/product.model")
const product = express.Router()
product.use(express.json())


product.post("/add",async(req,res)=>{
    const {name,price,title,type} = req.body
      
    try{
        if(!name || !price || !title ||!type || !image){
            return res.status(500).send("please fill the all field")
        }
        const product = new productModel({name,price,title,type})
         await product.save()
         res.status(200).send("product save succesfull")
    }catch(err){
       console.log(err.message)
       res.status(500).send("server error")
    }

})

product.get("/all",async(req,res)=>{     
    try{ 
        const product = await productModel.find()
        
         res.status(200).send({data:product})
    }catch(err){
       console.log(err.message)
       res.status(500).send("server error")
    }
})
product.patch("/update/:id",async(req,res)=>{
   
    try{    
        const product = await productModel.findOneAndUpdate({_id:req.params.id},req.body)
         res.status(200).send("product update succesfull")
    }catch(err){
       console.log(err.message)
       res.status(500).send("server error")
    }

})
product.delete("/delete/:id",async(req,res)=>{
      
    try{
        const product = await productModel.findOneAndDelete({_id:req.params.id},req.body)
        res.status(200).send("product delete succesfull")
    }catch(err){
       console.log(err.message)
       res.status(500).send("server error")
    }

})

module.exports={product}