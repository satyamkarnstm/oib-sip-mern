const stores=require('../models/stores')
const stocks=require('../models/stocks')
const order= require('../models/order')
const Razorpay = require('razorpay');
const { lowStockInformation } = require('./emailController');

// for send all stores to user
const getStores=async (req,res) => {
    try {
       const users=await stores.find({}, 'name place storeId').lean()
       res.status(200).json(users)
    } catch (error) {
        console.log(error);
    }
}

// for add pizza base in stock
const addpizzabase= async (req,res) => {
    try {
        const {storeId,name,stock,rate}=req.body
        const exisitingStore= await stocks.findOne({storeId})
        if (exisitingStore) {
            exisitingStore.pizzaBase.push({name,stock,rate})
            exisitingStore.save()
            return res.status(200).json({message:"pizza base added successfully"})
        }
        const newstocks= await new stocks({storeId,pizzaBase:{name,stock,rate}})
        newstocks.save()
        res.status(200).json({message:"pizza base added successfully"})
    } catch (error) {
        console.log(error);
    }
}

// for send pizza base to users
const getpizzabase=async (req,res) => {
    try {
        const storeId= req.params.id
        const stock= await stocks.findOne({storeId})
        res.json(stock.pizzaBase)
    } catch (error) {
        console.log(error);
    }
}

// for increase pizza base stocks
const pizzabaseincrease=async (req,res) => {
    try {
        const {storeId,item,name}=req.body;
       const getStock= await stocks.findOne({storeId})
       console.log('ggt',item);
       const number = parseInt(item.number)
      getStock.pizzaBase.map((i)=>{
        if (i.name==item.name) {
            i.stock+=item.number;
            res.status(200).json({message:"stock incsrease"})
        }
      })
      getStock.save()
        
    } catch (error) {
        console.log(error);
    }
}

// for delete particular pizza base
const deletepizzabase=async(req,res)=>{
    try { 
        const{id,storeId}=req.body
        
        const getStock= await stocks.findOne({storeId})
        const getData= getStock.pizzaBase
        const getId= getData.findIndex(p=>p._id==id)
        if (getId!== -1) getData.splice(getId, 1);
        getStock.save()
        res.status(200).json({message:'deleted successfully'})
    } catch (error) {
        console.log(error);
    }
}

// for add souces
const addsauce= async (req,res) => {
    try {
        const {storeId,name,stock,rate}=req.body
        const exisitingStore= await stocks.findOne({storeId})
        if (exisitingStore) {
            exisitingStore.sauce.push({name,stock,rate})
            exisitingStore.save()
            return res.status(200).json({message:"souce added successfully"})
        }
        const newstocks= await new stocks({storeId,sauce:{name,stock,rate}})
        newstocks.save()
        res.status(200).json({message:"souce added successfully"})
    } catch (error) {
        console.log(error);
    }
}

// send all souces to users
const getsouces=async (req,res) => {
    try {
        const storeId= req.params.id
        const stock= await stocks.findOne({storeId})
        res.json(stock.sauce)
    } catch (error) {
        console.log(error);
    }
}

// increase stock of souce
const souceincrease=async (req,res) => {
    try {
        const {storeId,item,name}=req.body;
    const getStock= await stocks.findOne({storeId})
      getStock.sauce.map((i)=>{
        if (i.name==item.name) {
            i.stock+=item.number;
            res.status(200).json({message:"stock incsrease"})
        }
      })
      getStock.save()
    } catch (error) {
        console.log(error);
    }
}

// for delete souces
const deletesouce=async(req,res)=>{
    try { 
        const{id,storeId}=req.body
        const getStock= await stocks.findOne({storeId})
        const getData= getStock.sauce
        const getId= getData.findIndex(p=>p._id==id)
        if (getId!== -1) getData.splice(getId, 1);
        getStock.save()
        res.status(200).json({message:'deleted successfully'})
    } catch (error) {
        console.log(error);
    }
}

// for add cheese
const addcheese= async (req,res) => {
    try {
        const {storeId,name,stock,rate}=req.body
        const exisitingStore= await stocks.findOne({storeId})

        if (exisitingStore) {
            exisitingStore.cheese.push({name,stock,rate})
            exisitingStore.save()
            return res.status(200).json({message:"cheese added successfully"})
        }
        const newstocks= await new stocks({storeId,cheese:{name,stock,rate}})
        newstocks.save()
        res.status(200).json({message:"cheese added successfully"})
        
    } catch (error) {
        console.log(error);
    }
}

// for send cheeses to users
const getcheeses=async (req,res) => {
    try {
        const storeId= req.params.id
        const stock= await stocks.findOne({storeId})
        res.json(stock.cheese)
    } catch (error) {
        console.log(error);
    }
}

// for increase cheese stocks
const cheeseincrease=async (req,res) => {
    try {
    const {storeId,item,name}=req.body;
    const getStock= await stocks.findOne({storeId})
    const number = parseInt(item.number)
      getStock.cheese.map((i)=>{
        if (i.name==item.name) {
            i.stock+=item.number;
            res.status(200).json({message:"stock incsrease"})
        }
      })
      getStock.save()
        
    } catch (error) {
        console.log(error);
    }
}

// for delete particular cheese
const deletecheese=async(req,res)=>{
    try { 
        const{id,storeId}=req.body
        const getStock= await stocks.findOne({storeId})
        const getData= getStock.cheese
        const getId= getData.findIndex(p=>p._id==id)
        if (getId!== -1) getData.splice(getId, 1);
        getStock.save()
        res.status(200).json({message:'deleted successfully'})
    } catch (error) {
        console.log(error);
    }
}

// for add vegs
const addveg= async (req,res) => {
    try {
        const {storeId,name,stock,rate}=req.body
        const exisitingStore= await stocks.findOne({storeId})
        if (exisitingStore) {
            exisitingStore.vegitables.push({name,stock,rate})
            exisitingStore.save()
            return res.status(200).json({message:"veg added successfully"})
        }
        const newstocks= await new stocks({storeId,vegitables:{name,stock,rate}})
        newstocks.save()
        res.status(200).json({message:"veg added successfully"})
    } catch (error) {
        console.log(error);
    }
}

// for get vegs
const getveg=async (req,res) => {
    try {
        const storeId= req.params.id
        const stock= await stocks.findOne({storeId})
        res.json(stock.vegitables)
    } catch (error) {
        console.log(error);
    }
}

// for increase vegs stocks
const vegsincrease=async (req,res) => {
    try {
        const {storeId,item,name}=req.body;
        const getStock= await stocks.findOne({storeId})
        console.log('ggt',item);
        const number = parseInt(item.number)
        getStock.vegitables.map((i)=>{
            if (i.name==item.name) {                
                i.stock+=item.number;
                res.status(200).json({message:"stock incsrease"})
            }
        })
        getStock.save()
        
    } catch (error) {
        console.log(error);
    }
}

// for delete particular vegs
const deleteveg=async(req,res)=>{
    try { 
        const{id,storeId}=req.body
        const getStock= await stocks.findOne({storeId})
        const getData= getStock.vegitables
        const getId= getData.findIndex(p=>p._id==id)
        if (getId!== -1) getData.splice(getId, 1);
        getStock.save()
        res.status(200).json({message:'deleted successfully'})
    } catch (error) {
        console.log(error);
        
    }

}

// for all operation of order including rozar pay
const setOrder=async (req,res) => {
    try {
      const  {orderItems,user,storeId}=req.body
      const newOrder= new order({
        customerId: user.id,
        customer_name:user.name,
        storeId:storeId,
        store_name:user.storeId,
        pizzabase:{name:orderItems.Pizzabase.name,price:orderItems.Pizzabase.price},
        souce:{name:orderItems.Souces.name,price:orderItems.Souces.price},
        chesse:{name:orderItems.Cheese.name,price:orderItems.Cheese.price},
        vegs:{name:orderItems.Vegs.name,price:orderItems.Vegs.price},
      })

      newOrder.save()

      const getStock= await stocks.findOne({storeId:orderItems.storeId})
      const getStore= await stores.findOne({storeId:orderItems.storeId})
      
      getStock.pizzaBase.map((i)=>{
        if (i.name==orderItems.Pizzabase.name) {
            i.stock-=1;
            if (i.stock>20) {
                lowStockInformation(getStore.email,getStore.name,i.name,'pizza base')
            }
        }
      })
      getStock.sauce.map((i)=>{
        if (i.name==orderItems.Souces.name) {
            i.stock-=1;
             if (i.stock>20) {
                lowStockInformation(getStore.email,getStore.name,i.name,'souce')
            }
            
        }
      })
      getStock.cheese.map((i)=>{
        if (i.name==orderItems.Cheese.name) {
            i.stock-=1;
             if (i.stock>20) {
                lowStockInformation(getStore.email,getStore.name,i.name,'cheese')
            }
        }
      })
      getStock.vegitables.map((i)=>{
        if (i.name==orderItems.Vegs.name) {
            i.stock-=1;
             if (i.stock>20) {
                lowStockInformation(getStore.email,getStore.name,i.name,'vegitables')
            }
        }
      })
      getStock.save()

      const razorpayInstance = new Razorpay({
      key_id: process.env.rozaypay_id, // Replace with your Razorpay Key ID
      key_secret: process.env.rozaypay_secret // Replace with your Razorpay Key Secret
      });

      const options = {
amount: 50000, // Amount in paise (e.g., ₹500)
currency: "INR",
receipt: "order_rcptid_11"
};
const orderpay = await razorpayInstance.orders.create(options);
res.json(orderpay);
     
    } catch (error) {
        console.log(error);
        
    }
}


module.exports={getStores,setOrder,
    addpizzabase,getpizzabase,deletepizzabase,pizzabaseincrease,
    addsauce,getsouces,deletesouce,souceincrease,
    addcheese,getcheeses,deletecheese,cheeseincrease,
    addveg,getveg,deleteveg,vegsincrease}