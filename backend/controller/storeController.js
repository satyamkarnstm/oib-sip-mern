const stores= require("../models/stores")
const cypto = require("crypto")
const bycypt= require('bcrypt');
const jwt= require('jsonwebtoken')
const { otpsender, storeVerification, storeInformation } = require("./emailController");
const { log } = require("console");
const stocks = require("../models/stocks");

// for add a store
const registration=async (req,res) => {
    try {
        const{name,place,email,password}=req.body;

        if (!name || !place || !email || !password) {
            return res.status(400).json({code:400,message:"all field required"})
        }

        if (password.length<8) {
            return res.status(400).json({code:400,message:"password should be atleast 8 digits"})
        }
        const hashPass= await bycypt.hash(password,10)
        const newstore= new stores({name,place,email,password:hashPass})
        await newstore.save()

        const link= `http://localhost:5173/varify/${newstore._id}`
        storeVerification(email,link,15)
        res.status(201).json({code:201,message:"verification link sent to your email"})

    } catch (error) {
        console.log(error);
        res.status(500).json({code:500,message:"server error, please try later"})        
    }  
}

// for verification of store
const verification=async (req,res) => {
    try {
        const{id}=req.body
        const store= await stores.findOne({_id:id})
        if (!store) {
            return res.status(400).json({coded:400,message:"invalid id"})
        } 
        if (store.storeId && store.varified) {
            return res.status(401).json({code:401,message:"you are already verified"})
        }

        const areaid= store.place.slice(0,3).toUpperCase()
        const nameid= store.name.slice(0,2).toUpperCase()
        const rendnum= Math.floor(100+Math.random()*9000).toString();
        store.storeId = areaid+rendnum+nameid;
        store.varified=true;
        store.save()

        const newstocks= await new stocks({storeId:store.storeId})
        newstocks.save()

        storeInformation(store.email,store.storeId)
        res.status(200).json({code:200,message:"store information sent to your email"})

    } catch (error) {
        console.log(error);
        res.status(500).json({code:500,message:"server error, please try later"})        
    }
}

// for login of store
const login=async (req,res) => {
    try {
        const{storeId,password}=req.body
        if (!storeId || !password) {
            return res.status(400).json({code:400,message:"all field required"})
        }
        const store= await stores.findOne({storeId})
        if (!store) {
            return res.status(400).json({code:400,message:"invalid store id"})
        }
        const verifyPass=await bycypt.compare(password,store.password);
        if (!verifyPass) {
            return res.status(401).json({code:401,message:"invalid password"})
        }

        const time=5;
        const randnum= Math.floor(100000+Math.random()*900000).toString()
        otpsender(store.email,randnum,time)
        store.otp= {code:await bycypt.hash(randnum,10),expireAt:new Date(Date.now())+time*60*1000}
        store.save()
        res.status(200).json({code:200,message:"login otp sent to your email"})

    } catch (error) {
        console.log(error);
        res.status(500).json({code:500,message:"server error, please try later"}) 
    }
}

// verify otp for store login
const otpVerify= async (req,res) => {
    try {
        const{storeId,otp}=req.body;
        if (!storeId || !otp) {
            return res.status(400).json({code:400,message:"all field required"})
        }
        const store= await stores.findOne({storeId})
        if (!store) {
            return res.status(400).json({code:400,message:"invalid store id"})
        }
        if (!store.otp) {
            return res.status(403).json({code:403,message:"invalid otp"})
        }
        const checkotp= await bycypt.compare(otp,store.otp.code)
        const timecheck= new Date(Date.now())>store.otp.expireAt
        if (!checkotp|| !timecheck) {
            return res.status(403).json({code:403,message:"invalid otp"})
        }
        store.otp=undefined
        store.save()
        const token= jwt.sign({id:store.storeId,name:store.name},process.env.JWT_KEY,{expiresIn:"10h"})
        res.status(200).json({code:200,message:"login successfully",token})

    } catch (error) {
        console.log(error);
        res.status(500).json({code:500,message:"server error, please try later"})
    }
}

// for send otp
const sendotp=async (req,res) => {
    try {
        const{storeId}=req.body;
        const store= await stores.findOne({storeId})
        if (!store) {
            return res.status(400).json({code:400,message:"invalid store id"})
        }
        const time=5;
        const randnum= Math.floor(100000+Math.random()*900000).toString()
        otpsender(email,randnum,time)
        store.otp= {code:await bycypt.hash(randnum,10),expireAt:new Date(Date.now())+time*60*1000}
        store.save()
        res.status(200).json({code:200,message:"login successfull"})

    } catch (error) {
        console.log(error);
        res.status(500).json({code:500,message:"server error, please try later"})
    }
}
module.exports={registration,verification,login,sendotp,otpVerify}