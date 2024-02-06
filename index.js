const express = require('express');
const app = express();
const mainRouter = require('./routes/index')
const cors = require('cors')

app.use(cors());
app.use(express.json())

app.use('/api',mainRouter)



app.listen(4000,()=>{
    console.log("port connected on 4000")
})