const mongoose = require('mongoose')



  const usermodel = new mongoose.Schema({

    username: String,
    email: String,
    phone: String,
    password: String,
    role: {
        type: String,
        default: 'user'  // ✅ sets default role
      }

  })



  module.exports = mongoose.model('user',usermodel)