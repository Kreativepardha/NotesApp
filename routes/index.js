const express = require('express')
const router = express.Router()
const userRouter = require('../routes/userRoutes');
const notesRouter = require('./notesRoutes')


router.use('/user',userRouter)
router.use('/notes',notesRouter)


module.exports= router ; 