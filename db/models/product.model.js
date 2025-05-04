const mongoose = require("mongoose")

let productSchema  = new mongoose.Schema({
    name:{
        type:String
    },
    price:{
        type:Number,
    },
    desc :{
      type:String
    },
    category:{
        type:String
    },
    createdAt:{
        type:Date,
        default : Date.now
    }
})

let productModel = mongoose.model("product",productSchema)
module.exports =productModel