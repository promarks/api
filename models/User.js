const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cpassword:{type:String,required:true},
    country:{type:String,required:false,default:"Nigeria"},
    isAdmin:{type:Boolean,default:false}
},{timestamps:true})

module.exports = mongoose.model("user",userSchema);