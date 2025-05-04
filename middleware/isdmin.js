const jwt = require("jsonwebtoken")
let tokenSecret = process.env.TOKEN_SECRET

module.exports = (req,res,next)=>{
   let token = req.header("x-access-token");
   if(!token){
    res.status(400).json({message:"token not found"})
   }
   try{
      const decode = jwt.verify(token,tokenSecret);
      req.userId = decode.userId;
      let type = decode.type;
      if(type !=1){
        return res.status(401).json({message:"you are not authorised to access this resource"})
      }
      next()
   }
   catch(err){
      return res.status(401).json({message:"token is expired or curropter"})
   }
} 