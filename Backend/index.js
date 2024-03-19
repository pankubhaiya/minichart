const express = require("express")
const cors = require("cors")
require("dotenv").config()
const {connect} = require("./connection/index")
const {userRouter} = require("./Routers/user.router")
const { product } = require("./Routers/product.router")
const app = express()
const authMiddleware = require("./Midelware/index")
app.use(express.json())
app.use(cors());
const port = 8000 || process.env.Port
app.get("/",(req,res)=>{

    res.send("wlc to home page")
})
app.use("/",userRouter)
app.use("/",product)
app.listen(port,async()=>{
    console.log(`server is running ${port} `)
    try{
        await connect
        console.log("mongoose data in connect")
    }catch(err){
        console.log(err.message)
    }
})