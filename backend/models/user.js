const mongoose= require('mongoose')

// user schema
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    otp:{
        code:{type:String},
        expiredAt:{type:Date}
    },
    isVarified:{
        type:Boolean,
        default:false
    },
    token:{
        code:{type:String},
        expiredAt:{type:Date}
    }
},{timestamps:true})

module.exports= mongoose.model('user',userSchema)