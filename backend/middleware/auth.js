import jwt from "jsonwebtoken"
import {userModel} from "../models/User.js"
export const isAuthenticated=async(req,res,next)=>{
    try {
        const {token}=req.cookies;
        if(!token){
            return res.status(401).json({
                message:"Please login to access this resource"
            })
        }
        const decoded= await jwt.verify(token, process.env.JWT_SECRET);
        req.user=await userModel.findById(decoded._id);
        next();
    } catch (error) {
        res.status(401).json({
            message:error.message
        })
        
    }
}