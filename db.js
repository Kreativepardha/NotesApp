const mongoose = require('mongoose')


mongoose.connect("mongodb+srv://saradhipardha12:PARDHA123@cluster0.n0euu2z.mongodb.net/notesapp")



const userSchema = mongoose.Schema({
    // username:{
    //     type:String,
    //     required:true
    // },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true,
    }
})
const noteSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
        required: true
    }, 
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true,
    }
})




const User = mongoose.model("User",userSchema)
const Notes = mongoose.model("Notes",noteSchema)


module.exports = {
    User,
    Notes
}
