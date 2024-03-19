const mongoose = require("mongoose")
const productSchema = mongoose.Schema({
    name:{type:String,require:true},
    price:{type:Number,require:true},
    title:{type:String,require:true},
    type:{type:String,require:true},
})

const productModel = mongoose.model("product",productSchema)

module.exports = {productModel}