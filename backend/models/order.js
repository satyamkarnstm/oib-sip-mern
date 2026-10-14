const mongoose = require('mongoose')

// order schema
const orderSchema= mongoose.Schema([{
    customerId:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    customer_name:{type:String},
    storeId:{type:String},
    store_name:{type:String},
    pizzabase:{name:{type:String},price:{type:Number}},
    souce:{name:{type:String},price:{type:Number}},
    chesse:{name:{type:String},price:{type:Number}},
    vegs:{name:{type:String},price:{type:Number}},
}],{timestamps:true})

module.exports= mongoose.model('order',orderSchema)