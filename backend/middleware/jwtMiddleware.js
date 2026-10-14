const jwt =require('jsonwebtoken')


// for verify jwt token
const varify=(req,res,next)=>{
    try {
        const {token}=req.body
        if (!token) {
           return res.status(401).json({code:401,message:'no token found'})
        }
        jwt.verify(token,process.env.JWT_KEY,(error,data)=>{
            if (error) {
                return res.status(401).json({code:401,message:'invalid or expired token'})
            }
            console.log(data);
            req.name=data.name
            req.id=data.id
            next()
        })
       
        
    } catch (error) {
        console.log(error);
        
    }

}

module.exports={varify}