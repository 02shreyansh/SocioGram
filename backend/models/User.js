import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter a name"]
    },
    avatar:{
        public_id:String,
        url:String,
    },
    email:{
        type:String,
        required:[true,"Please enter a email"],
        unique:[true,"Email already exists"]
    },
    password:{
        type:String,
        required:[true,"Please enter a password"],
        minlength:[8,"Password must be at least 8 characters"],
        select:false
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ],
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    resetPasswordToken:String,
    resetPasswordExpires:Date,

})
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10)
    }
    next();
})
userSchema.methods.matchPassword=async function (password) {
    return await bcrypt.compare(password,this.password)
    
}
userSchema.methods.generateToken=async function () {
    return jwt.sign({_id:this._id},process.env.JWT_SECRET)
}
userSchema.methods.getRestPasswordToken=function () {
    const resetToken=crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpires=Date.now()+15*60*1000;
    return  resetToken;
}

export const userModel=mongoose.model("User",userSchema)