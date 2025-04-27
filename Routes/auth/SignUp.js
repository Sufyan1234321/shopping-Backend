const express = require('express')
const userModel = require('../../module/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const router = express.Router()




router.post('/', async(req , res)=>{

    const {username , phone, email, password,role} = req.body;

      console.log(role)

     const existinguser = await userModel.findOne({username })

     if(existinguser){

        return res.status(409).json({message:"user is already exist"})
     }
      const hashpassword = await bcrypt.hash(password,10)

      const newuser = new userModel({
        username,
        email,
        phone,
        password : hashpassword,
        role: role
      })

      await newuser.save()
      res.status(201).json('user register successfully')
      
})


module.exports = router;