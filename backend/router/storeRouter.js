const express=require('express')
const { registration, verification, login, otpVerify, sendotp } = require('../controller/storeController')
const { 
    addpizzabase, getpizzabase, deletepizzabase,
    addsauce, getsouces, deletesouce, 
    addcheese, getcheeses, deletecheese,
    addveg, getveg, deleteveg, 
    pizzabaseincrease,
    souceincrease,
    cheeseincrease,
    vegsincrease
    }= require('../controller/orderController')


const router=express.Router()
// for stores operations
router.post('/registration',registration)
router.post('/verify', verification)
router.post('/login',login)
router.post('/otpverify',otpVerify)
router.post('/sendotp',sendotp)

// for pizza base operation
router.post('/addpizzabase',addpizzabase)
router.get('/getpizzabase/:id',getpizzabase)
router.post('/pizzabasedel',deletepizzabase)
router.post('/increasepizzabase',pizzabaseincrease)

// for souce operations
router.post('/addsouce',addsauce)
router.get('/getsouces/:id',getsouces)
router.post('/delsouce',deletesouce)
router.post('/increasesouce',souceincrease)

// for cheese operations
router.post('/addcheese',addcheese)
router.get('/getcheese/:id',getcheeses)
router.post('/delcheese',deletecheese)
router.post('/increasecheese',cheeseincrease)

// for vegs operations
router.post('/addveg',addveg)
router.get('/getveg/:id',getveg)
router.post('/delveg',deleteveg)
router.post('/increasevegs',vegsincrease)


module.exports=router