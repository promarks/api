const Address = require('../models/Address');
const router = require('express').Router();
const { verifyToken, verifyTokenAuthorization} = require('./verifyToken');
//create a new Address;
router.post('/', verifyToken, async(req,res)=>{
    const newAddress = new Address({
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        company:req.body.company,
        addressOne:req.body.address1,
        addressTwo:req.body.address2,
        city:req.body.city,
        country:req.body.country,
        province:req.body.province,
        phone:req.body.phone,
        postalcode:req.body.postcode,
        userId:req.body.userId,
        checkStatus:req.body.checkStatus
    });
    try{
        const existingAddress = await Address.findOne({userId:req.body.userId});
        if(existingAddress === null){
            const savedAddress = await newAddress.save();
            res.status(200).json({message: "Address Added",address:savedAddress});
            console.log(savedAddress);
        }
        else{
            res.status(400).json({message: "Address Already exists Added"});
        }
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

//update Address;
router.post("/update/:id", verifyTokenAuthorization, async(req,res)=>{
    const id = req.params.id;
    const updates = req.body;
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();   
    }
    try{
        const updatedAddress = await Address.findByIdAndUpdate(id,{
            $set:updates
        },{new:true})
        res.status(200).json(updatedAddress);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//delete Address;
router.delete("/:id", verifyTokenAuthorization, async (req,res)=>{
    try{
        const deletedAddress = await Address.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedAddress);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//get Address
router.get("/:id", async (req,res)=>{
    try{
        const Address = await Address.findById(req.params.id);
        res.status(200).json(Address);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

//get all Addresss;
router.get('/', async (req,res)=>{
    try{
        const Addresss = await Address.find();
        res.status(200).json(Addresss);
    }
    catch(err){
        res.status(500).json(err)
        console.log(err)
    }
});

module.exports = router