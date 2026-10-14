require('dotenv').config()
require('./db')
const auth= require('./router/authRouter')
const cors= require('cors')
const express= require("express")
const { varify } = require('./middleware/jwtMiddleware')
const stores = require('./router/storeRouter')
const  socketHandler= require("./sockets/socket")
const http = require('http')


const {Server}=require('socket.io')
const app= express()
app.use(express.json())
const port=8080

app.use(cors({
  origin: "*", // Your React frontend domain
  methods: ["GET", "POST"],
  credentials: false
}));

const server= http.createServer(app)

server.listen(port,()=>{
    console.log('server is running at',port);
     
})

const io = new Server(server, {
  cors: {
    origin: "*", // React frontend URL
    methods: ["GET", "POST"],
    credentials: false
  }
});
socketHandler(io)



app.use(express.json())
app.post('/varify',varify,(req,res)=>{res.status(200).json({code:200,name:req.name,id:req.id}),console.log(req);})
app.use('/auth',auth)
app.use('/stores',stores)
