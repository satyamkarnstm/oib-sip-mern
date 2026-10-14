const mongoose = require("mongoose")

// store schema
const store_schema= new mongoose.Schema({
    storeId:{
        type:String,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    varified:{
        type:Boolean,
        default: false
    },
    otp:{
        code:{type:String},
        expireAt:{type:Date}
    }
})

module.exports= mongoose.model("store",store_schema)