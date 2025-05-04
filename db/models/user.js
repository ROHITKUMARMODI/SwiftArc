const mongoose = require("mongoose")
let userSchema = new mongoose.Schema({
   name:{
    type:String
   },
   password:{
    type:String,
    required:true
   },
   phone:{
    type:Number,
    unique:true
   },
   createdAt:{
    type:Date,
    default:Date.now
   }
})

let userModel = mongoose.model("user",userSchema)

module.exports = userModel