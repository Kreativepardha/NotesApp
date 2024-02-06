const express = require('express')
const router = express.Router();
const { User, Notes } = require('../db');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.post('/signup',async(req,res)=>{
    const {username,email,password} =  req.body;

try{
    const existingUser = await User.findOne({email})

    if(existingUser) {
        return res.status(409).json({
            message:"Email already exists / incorrect inputs"
        })

    }
    const hashedPassword = await bcrypt.hash(password,10);



    const user = await User.create({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword,

    })
  

    const token =  jwt.sign({
        userId:user._id
    },"pardhakey");

}catch(error){

    console.error(error);
    res.status(500).json({
        message:"internal server error"
    })
}

})

router.post('/login',async (req,res)=>{

    const {email,password} = req.body;
    try {
        
        const existingUser = await User.findOne({email});

        if (existingUser && await bcrypt.compare(password, existingUser.password)) {
            const token = jwt.sign({ userId: existingUser._id }, "pardhakey");

            return res.json({ token });
        }


            return res.status(401).json({ message: "Invalid email or password" });

    } catch (error) {

        console.error(error);
        res.status(500).json({
            message:"internal server error"
        })
    }

})

module.exports = router; 