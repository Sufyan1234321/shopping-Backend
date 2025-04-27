const express = require('express')
const router = express.Router();
const userModel = require('../../module/userModel')





router.post('/', async(req , res)=>{
    const {username , email} = req.body
       console.log(username)
    const deleteuser = await userModel.findOneAndDelete({username , email})

    if(!deleteuser){
        return res.status(404).json({message:"user not found"})
    }

    res.status(200).json({message:"user deleted successfully"}) 
})


module.exports = router