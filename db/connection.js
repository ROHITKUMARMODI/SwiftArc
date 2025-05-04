const mongoose = require("mongoose")

let mongourl = process.env.MONGO_URL
mongoose.connect(mongourl)
.then(()=>console.log("connected to databases"))
.catch((err)=>console.log("not connected to database"))