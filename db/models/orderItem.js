const mongoose = require("mongoose")
const objectId = mongoose.Schema.ObjectId
const orderItemSchema = new mongoose.Schema({
   product:{
    type:objectId
   },
   price:{
    type:Number,
  },
  quantity:{
    type:Number
  },
})

module.exports = orderItemSchema