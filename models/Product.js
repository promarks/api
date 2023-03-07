const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{type:String,required:true,unique:true},
    desc:{type:String,required:true},
    image:{type:Array,required:true},
    size:{type:Array,required:true},
    quantity:{type:Number,required:true,default:1},
    qty:{type:Number,required:true},
    price:{type:Number,required:true},
    inStock:{type:String,required:true}
},{timestamps:true})

module.exports = mongoose.model("product",productSchema);