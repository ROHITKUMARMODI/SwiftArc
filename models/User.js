const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email:String,
  role: { type: String, default: 'user' } 
  // can be 'admin', 'rider', 'user'
});
module.exports = mongoose.model('User', userSchema);
