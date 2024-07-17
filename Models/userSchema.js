const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String
    },
    address:{
        type:String
    }
})

//model creation - users (mongodb collection)
const users = mongoose.model('users', userSchema)

module.exports=users