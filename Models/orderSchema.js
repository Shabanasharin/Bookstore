const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    items:{
        type:Array,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})
const orders = mongoose.model("orders", orderSchema)
module.exports = orders