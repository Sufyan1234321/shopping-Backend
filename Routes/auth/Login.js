const express = require("express")
const usermodel = require('../../module/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router();



router.post('/', async (req,res)=>{


    const {username,password} = req.body;

    const newuser = await usermodel.findOne({username})

       if(!newuser){
          return res.status(401).json({message:"user not found"})
       }


     const match = await  bcrypt.compare(password, newuser.password)

        if(!match){
            return res.status(401).json({ message: 'Invalid password' });
        }
     
      const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    if(newuser){
        res.json({
            message:'login success', 
            token,
               user:{
                username: newuser.username,
                email: newuser.email,
                phone: newuser.phone,
                role: newuser.role
               }
            })  

    }else{
        res.status(401).json({
            message: 'login failed',
        });
    }
    
    
  })

  module.exports = router;
