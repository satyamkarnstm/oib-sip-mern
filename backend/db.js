const mongoose=require("mongoose")

const urls= process.env.url
mongoose.connect(urls)
.then(()=>{
    console.log('db connected');
    
})
.catch((error)=>{
    console.log(error);
    
})

