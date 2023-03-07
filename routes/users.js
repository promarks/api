const User = require('../models/User');
const { verifyToken, verifyTokenAuthorization, verifyTokenAdmin } = require('./verifyToken');

const router = require('express').Router();

//change user data;
router.put("/:id",verifyTokenAuthorization,async (req,res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatedUser);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

//delete user;
router.post("/delete/:id", verifyTokenAdmin, async (req,res)=>{
    try{
        const deleted = await User.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({message:"User has been deleted"});
    }
    catch(err){
        res.status(500).json({'message':err});
        console.log(err);
    }
})

//get user
router.get("/:id",verifyTokenAdmin, async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

//get all users;
router.get('/', verifyTokenAdmin, async (req,res)=>{
    try{
        const users = await User.find();
        const total = users.length;
        res.status(200).json({users:users, total:total});
        
    }
    catch(err){
        res.status(500).json(err);
        console.log(err)
    }
});


module.exports = router