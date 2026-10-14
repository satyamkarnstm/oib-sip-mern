const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const users= require('../models/user')
const cypto= require('crypto')
const jwt=require('jsonwebtoken')
const { otpsender, passresetsender } = require("./emailController")

// for user register
const signup=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        if (!name && !email && !password) {
            return res.status(405).json({message:"all field required",success:false})           
        }
    const isExistingUser= await users.findOne({email})
    if (isExistingUser) {
        return res.status(401).json({message:"user already exists, please login",success:false})
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const hashedOTP = await bcrypt.hash(otp, 10);  
    const time=5
    const setTime= new Date(Date.now() + 5* 60 * 1000);  
    otpsender(email,otp,time)
    const hashPassword=await bcrypt.hash(password,10);
    const newuser= new users({name,email,password:hashPassword,otp:{code:hashedOTP,expiredAt:setTime}})
    newuser.save()
    res.status(200).json({message:"registered successfully, please varify your email",success:true})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// for user login
const login=async(req,res)=>{
    try {
        const{email,password}=req.body
    const existingUser= await users.findOne({email})

    if (!existingUser) {
        return res.status(406).json({code:406,message:"email or password not correct"})
    }
    if (existingUser.isVarified==false) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        const hashedOTP = await bcrypt.hash(otp, 10);  
        const time=5
        const setTime= new Date(Date.now() + 5* 60 * 1000);  
        otpsender(email,otp,time)
        existingUser.otp={code:hashedOTP,expiredAt:setTime}
        existingUser.save()
        return res.status(405).json({code:405,message:"please varify yourself first"})
    }
    const passVari= await bcrypt.compare(password,existingUser.password)
    
    if (!passVari) {
        return res.status(406).json({code:406,message:"email or password not correct"})
    }

    const token= jwt.sign({id:existingUser.id,name:existingUser.name,isUser:true},process.env.JWT_KEY,{expiresIn:"10h"})

    return res.status(202).json({code:202,message:"login successfully",token:token})      
    } catch (error) {
        res.status(500).json({code:500,message:error.message})
        console.log(error);
    }
}
    
// for user verification by otp
const varification=async(req,res)=>{
    try {
        const{email,otp}=req.body
        
    const getUser= await users.findOne({email})
    if (!getUser) {
        return res.status(409).json({code:409,message:"you havan't any account, please register yourself"})
    }
    const currentTime= new Date(Date.now())
    if (currentTime>getUser.otp.expiredAt) {
        return res.status(410).json({code:410,message:"this otp expired"})
    }
    const isTrue= await bcrypt.compare(otp,getUser.otp.code)
    if (!isTrue) {
        return res.status(406).json({code:406,message:"wrong otp, try again"})
        }
    
        getUser.otp=undefined
        getUser.isVarified=true
        getUser.save()
        console.log('done');
        
        return res.status(210).json({code:405,message:"email varified"})
    } catch (error) {
        res.status(500).json({message:"server error"})
        console.log(error);
        
    }
    

}

//for send otp
const sendOtp=async(req,res)=>{
    try {
        const{email}=req.body
    const existingUser= await users.findOne({email})
    if (!existingUser) {
        return res.status(409).json({code:409,message:"you havan't any account, please register yourself"})
    }
     const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const hashedOTP = await bcrypt.hash(otp, 10);  
    const time=5
    const setTime= new Date(Date.now() + time* 60 * 1000);  
    otpsender(email,otp,time)
    existingUser.otp={code:hashedOTP,expiredAt:setTime}
    existingUser.save()
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// for reset password
const initresetpass=async(req,res)=>{
    try {
        const {email}=req.body
    const user= await users.findOne({email})
    if (!user) {
        res.status(430).json({code:430,message:"user not found"})
    }
    const token=cypto.randomBytes(30).toString('hex')
    const link = `http://localhost:5173/${token}`
    const time=15
    const setTime= new Date(Date.now()+time*60*1000)
    passresetsender(email,link,time)
    user.token={code:token,expiredAt:setTime}
    user.save()
    res.status(235).json({code:235,message:"reset password sent"})
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log(error);
    }
}

module.exports={signup,login,varification,sendOtp,initresetpass}