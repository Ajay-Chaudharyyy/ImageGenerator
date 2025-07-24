const User = require("../Model/UserModel");
const jwt = require("jsonwebtoken");


exports.userAuth = async(req,res,next) => {
    console.log("Called userAuth")
    try{
        console.log("Token ---  ",req?.cookies?.token)
        const token = req.cookies.token

        if(!token)
        {
            return res.status(400).json({
                success:false,
                message:"Token not found"
            })
        }

        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        if(!decodedToken)
        {
            return res.status(400).json({
                success:false,
                message:"Token is Incorrect"
            })
        }

        req.user = decodedToken
        next();
    }catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Internal server Error",
            error:err.message
        })
    }
}