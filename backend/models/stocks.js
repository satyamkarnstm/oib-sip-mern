const { default: mongoose } = require("mongoose")


// stock schema
const stockSchema= new mongoose.Schema({
    storeId:{
        type:String,
        required:true    
    },
    pizzaBase:[
        {
            name:{type:String},
            rate:{type:Number},
            stock:{type:Number}
        }
    ],
    sauce:[
        {
            name:{type:String},
            rate:{type:Number},
            stock:{type:Number},
        }
    ],
    cheese:[
        {
            name:{type:String},
            rate:{type:Number},
            stock:{type:Number}
        }
    ],
    vegitables:[
        {
            name:{type:String},
            rate:{type:Number},
            stock:{type:Number}
        }
    ]

})


module.exports= mongoose.model('stocks',stockSchema)