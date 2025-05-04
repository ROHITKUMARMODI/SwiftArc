let {validationResult, body} = require("express-validator")
let bcrypt =requirre("bcryptjs")
let {v4:uuid} = require("uuid")
let jwt = require("jsonwebtoken")
const userModel = require("../db/models/user")

let signinUser = async(req,res)=>{
   let errors = validationResult(req);
   let body = req.body;
   if(errors && errors.length){
    res.status(400).json({message:errors[0].message})
   }
  let user = await userModel.findOne({email:body.email})
  if(!user && Object.keys(user).length ==0){
 return res.status(404).json({ success: false, message: "User not found" });
  }
  let isPassword = await bcrypt.compare(user.password,body.password);
  if(!isPassword){
    return res.status(404).json({message:"Pasweord inorrect"})
  }
  const payload={userId:user._id,type:user.type||0,name:user.name}
  jwt.sign(payload,process.env.TOKEN_SECRET,{expriesIn:3600},(err,token)=>{
    if(err){return res.status(500).json({message:"Internal server error"})}
    res.jaon({token:token})
  });
}

let signUpUser = async(req,res)=>{
  let body = req.body;
  const errors = validationResult(req);
  if(errors && errors.length){
    return res.json({message: errors[0].message})
  }
  if(!body || !body.email||!body.password || !body.name || !body.phone){
    return res.stus(401).json({message:"required field is missing"})
  }
  try{
    const existingUser = await users.findOne({email:body.email});
    if(existingUser){
      return res.status(409).json({message:"user already signed"})
      }
      const salt = await bcrypt.genSalt(11);
      const newUser ={
        name:body.name,
        email:body.email,
        password:await bcrypt.hash(body.password,salt),
        phone:body.phone
      }
      await user.insertOne(newUser)
      res.status(201).json({message:"user signed up successfully"})
  } 
  catch(err){
    return res.status(500).json({message:"internal server error"})
  }
}

let updateUser = async(req,res)=>{
     let userId = req.params.id;
     let {name,phone} = req.body;
     try{
      const user = await userModel.findById(userId);
      if(!user){
        return res.status(404).json({ success: false, message: "User not found" });
      }
      if (name) user.name = name;
      if (phone) user.phone = phone;
      await user.save()
      res.status(200).json({ success: true, message: "User details updated successfully", user });
     }
     catch(err){
      res.status(500).json({ success: false, message: "Error updating user" });
     }
}
let deleteUser = async(req,res)=>{
  try{
    const userID = req.params.id;
    let deletedUser = await users.findByIdAndDelete(userID);
    if(!deleteUser){
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted successfully" });
  }
  catch(err){
    res.status(500).json({ success: false, message: "Error deleting user" });
  }
}


module.exports = {
  siginUser,
  signUpUser,
  updateUser,
  deleteUser,
};