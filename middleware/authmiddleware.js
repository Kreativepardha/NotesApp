const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({message:"Unauthorized Access"});
    }
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token,"pardhakey");

        if(decoded.exp <= Date.now() / 1000){
            return res.status(401).json({message:"Token expired"})
        }

        req.userId = decoded.userId;
        next();
    }catch(err){
        return res.status(403).json({message: "Forbidden" });
    }
}

module.exports = {
    authMiddleware
}