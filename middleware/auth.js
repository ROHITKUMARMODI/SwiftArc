const jwt = require("jsonwebtoken")
let tockenSecret = process.env.TOCKEN_SECRET

module.exports = (req,res,next)=>{
    let token = req.header('x-access-token')
    if(!token){
        return res.status(400).json({message:"token not found"})
    }
    try{
        let decode = jwt.verify(token,tockenSecret);
        req.userId = decode.userId
        next()
    }
    catch(err){
        res.status(401).json({message:"token is expired and corrupted"})
    }
}