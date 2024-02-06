const express = require('express')
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {authMiddleware} = require("../middleware/authmiddleware");
const { Notes } = require('../db');


router.use(authMiddleware)


router.get("/",authMiddleware,async (req,res)=>{

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({message:"Unauthorized Access"});
    }
    const token = authHeader.split(' ')[1];

   try {
    const decode = await jwt.verify(token,"pardhakey");
    const data = await Notes.find({userId:decode.userId});
 
    res.send({
        data:data,
        message:"successs"
    })
   
   } catch (error) {
    res.send({
        message: error.message,
    });

   }

 
})




router.post("/create", authMiddleware ,async(req,res)=>{

    const {title,body} = req.body;
    const userId = req.userId;

try {
    
    await Notes.create({
        userId,
        title,
        body
    })
    res.json({message:"Note created succesffuly "})
} catch (error) {
    console.error(error)
    res.status(500).json({message:"internal servr error"})
}
})

router.patch('/', async(req,res)=>{
    let {id,body,title} = req.body;
        try {
             const updateNote =  await Notes.findByIdAndUpdate(id,{body,title})
             if(!updateNote) return res.json({message:"note not found"})
                
             res.send({
                    message:"note updated",
                    updateNote

                })
        } catch (error) {
            res.send({
                message:error.message
            })
        }
})
router.delete('/', async(req,res)=>{
    const {id} = req.body;
        try {
             const noteDelted =await Notes.findByIdAndDelete(id)
             if(!noteDelted) return res.json({message:"note not found"})
                res.send({
                    message:"note deleted",
                    noteDelted
                })
        } catch (error) {
            res.send({
                message:error.message
            })
        }
})

module.exports =  router ; 