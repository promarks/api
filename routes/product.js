const Product = require('../models/Product');
const router = require('express').Router();
const { verifyToken, verifyTokenAuthorization, verifyTokenAdmin } = require('./verifyToken');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'../client/public/assets/')
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
})

const upload = multer({storage:storage})

//create a new product;
router.post('/', verifyTokenAdmin, upload.array("photos",12), async(req,res)=>{
    const newProduct = new Product({
        size:req.body.size,
        price:req.body.price,
        desc:req.body.details,
        title:req.body.title,
        qty:req.body.quantity,
        inStock:req.body.stock,
        image:req.files
    });
    try{
        const savedProduct = await newProduct.save();
        res.status(200).json({message:"Product Added"});
        console.log(savedProduct);
    }
    catch(err){
        res.status(500).json({err:err, message:"Product Not Added!"});
        console.log(err);
    }
});

//update product;
router.post("/update/:id", verifyTokenAdmin,upload.array("photos",12), async(req,res)=>{
    const id = req.params.id
    const updates = ({
        size:req.body.sizeUpdate,
        price:req.body.priceUpdate,
        desc:req.body.detailsUpdate,
        title:req.body.titleUpdate,
        qty:req.body.quantityUpdate,
        inStock:req.body.stockUpdate,
        image:req.files
    });
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id,{
            $set:updates
        },{new:true})
        console.log(updatedProduct);
        res.status(200).json({updatedProduct:updatedProduct,message:"Update Successful"});
    }
    catch(err){
        res.status(500).json({err:err, message:"Product Not Updated!"});
        console.log(err);
    }
})

//delete product;
router.post("/delete/:id", verifyTokenAdmin, async (req,res)=>{
    try{
        const deletedProduct = await Product.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({deletedProduct,message:"Product deleted"});
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//get product
router.get("/:id", async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

//get all products;
router.get('/', async (req,res)=>{
    try{
        const products = await Product.find();
        const total = products.length;
        res.status(200).json({products:products, total:total});
    }
    catch(err){
        res.status(500).json(err)
        console.log(err)
    }
});

module.exports = router