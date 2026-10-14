const express= require("express")
const { signup, login, varification, sendOtp, initresetpass } = require("../controller/authController")
const { getStores, getpizzabase, getsouces, getcheeses, getveg, setOrder } = require("../controller/orderController")

const router= express.Router()

router.post('/signup',signup)  // for register or signup of user
router.post('/login',login)   // for login of user
router.post('/varification',varification) // for verification of user
router.post('/otpsent',sendOtp) // for send otp for user verification
router.post('/resetpass',initresetpass) // for reset user password


router.get('/getstore',getStores) // to send all stores to user
router.get('/getpizzabase/:id',getpizzabase) // to send pizza bases
router.get('/getsouces/:id',getsouces) // to send souces
router.get('/getcheese/:id',getcheeses) // for send cheese
router.get('/getveg/:id',getveg) // for send vegs
router.post('/setorder',setOrder) // for set order

module.exports=router