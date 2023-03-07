const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const addressRoute = require('./routes/address');
const subscribeRouter = require('./routes/subscribe');


dotenv.config();
const app = express();
const session = require('express-session');
app.use(session({key:"userid",secret:"subscribe",resave:false,saveUninitialized: true,save:false,cookie:{
    expires: 60 * 60 * 24,
}}));

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true }).then(()=>{
    console.log("Life,Design,Code")
}).catch((err)=>{
    console.log(err);
})

//middleware;
app.use(cors({
    origin: true, 
    methods:["GET","POST","HEAD"],
    credentials: true, 
}));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/subscribe", subscribeRouter);
app.use("/api/users", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/address", addressRoute);

app.listen(process.env.PORT || 5000,()=>{
    console.log("Time to create");
})