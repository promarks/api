const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    products:[{
        productid:{
            type:String,
        },
        quantity:{
            type:Number,
            default:1
        },
        price:{
            type:Number
        }
    }],
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Pending"}
},{timestamps:true})

module.exports = mongoose.model("order",orderSchema);