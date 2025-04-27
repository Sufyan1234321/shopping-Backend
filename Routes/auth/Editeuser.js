const express = require('express');

const router = express.Router();

const userModel = require('../../module/userModel');


router.get('/', async (req,res)=>{
    try {
        const allusers = await userModel.find({});
        
        // Exclude password from the response
        const usersWithoutPasswords = allusers.map(user => {
          const { password, ...userData } = user.toObject(); // Exclude password field
          return userData;
        });
    
        res.status(200).json(usersWithoutPasswords);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server Error' });
      }
    

    
     
})


module.exports = router