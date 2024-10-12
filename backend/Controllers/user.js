import { userModel } from "../models/User.js";
import { postModel } from "../models/Post.js";
import { sendEmail } from "../middleware/sendEmail.js";
import crypto from "crypto"
import cloudinary from "cloudinary"
export const register=async (req,res)=>{
    try {
        const {name,email,password,avatar}=req.body;
        let user=await  userModel.findOne({email});
        if(user) return res.status(400).json({success:false,message:"User Already exists"})
        const mycloud=await cloudinary.v2.uploader.upload(avatar,{
            folder:"avatars",
        })
        user=await userModel.create({
            name,email,password,
            avatar:{
                public_id:mycloud.public_id,
                url:mycloud.secure_url
            }
        })
        const token =await user.generateToken();
        const options={
            expires:new Date(Date.now() + 90*24*60*60*1000),
            httpOnly:true
        }
        res.status(201).cookie("token",token,options).json({
            success:true,
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            success:true,
            message:error.message
        })
    }
}

export  const login=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email}).select("+password").populate("posts followers following")
        if(!user){
            return res.status(400).json({
                success:false,message:"Invalid email or password"
            })
        }
        const isMatch=await user.matchPassword(password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
        }
        const token =await user.generateToken();
        const options={
            expires:new Date(Date.now() + 90*24*60*60*1000),
            httpOnly:true
        }
        res.status(200).cookie("token",token,options).json({
            success:true,
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const logout=async (req,res)=>{
    try {
        res.status(200).cookie("token",null,{expires:new Date(Date.now()),httpOnly:true}).json({
            success:true,
            message:"Logged out successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const followUser=async(req,res)=>{
    try {
        const userTofollow=await userModel.findById(req.params.id);
        const loggedInUser=await userModel.findById(req.user._id);
        if(!userTofollow){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        if(loggedInUser.following.includes(userTofollow._id)){
            const indexFollowing=loggedInUser.following.indexOf(userTofollow._id)
            loggedInUser.following.splice(indexFollowing,1)
            const indexFollowers=userTofollow.followers.indexOf(loggedInUser._id)
            userTofollow.followers.splice(indexFollowers,1)
            await loggedInUser.save();
            await userTofollow.save();
            return res.status(200).json({
                success:true,
                message:"User unfollowed"
            })
        }
        else{
            loggedInUser.following.push(userTofollow._id);
            userTofollow.followers.push(loggedInUser._id);
            await loggedInUser.save();
            await userTofollow.save();
            return res.status(200).json({
                success:true,
                message:"User followed successfully"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const updatePassword=async(req,res)=>{
    try {
        const user=await userModel.findById(req.user._id).select("+password");
        const {oldPassword,newPassword}=req.body;
        if(!oldPassword || !newPassword){
            return res.status(200).json({
                success:false,
                message:"Please enter both old and new password"
            })
        }
        const isMatch=await user.matchPassword(oldPassword)
        if(!isMatch){
            return res.status(200).json({
                success:false,
                message:"Old password is incorrect"
            })
        }
        user.password=newPassword;
        await user.save();
        return res.status(200).json({
            success:true,
            message:"Password updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const updateProfile=async(req,res)=>{
    try {
        const user=await  userModel.findById(req.user._id);
        const {name,email,avatar}=req.body;
        if(name){
            user.name=name;
        }
        if(email){
            user.email=email;
        }
        if(avatar){
            await cloudinary.v2.uploader.destroy(user.avatar.public_id)
            const mycloud=await cloudinary.v2.uploader.upload(avatar,{
                folder:"avatars",
            })  
            user.avatar.public_id=mycloud.public_id;
            user.avatar.url=mycloud.secure_url;

        }

        // user avtar : TODO
        await user.save()
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const deleteUser=async(req,res)=>{
    try {
        const user=await  userModel.findById(req.user._id);
       
        const posts=user.posts;
        const follwers=user.followers;
        const following=user.following;
        await cloudinary.v2.uploader.destroy(user.avatar.public_id)

        const userId=user._id;
        await userModel.findByIdAndDelete(user)
        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true,
        })
        
        for (let i = 0; i < posts.length; i++) {
            const post =await  postModel.findById(posts[i]);
            
            await cloudinary.v2.uploader.destroy(post.image.public_id);
            await  postModel.findByIdAndDelete(post)
            
        }
        for (let i = 0; i < follwers.length; i++) {
            const follower =await  userModel.findById(follwers[i]);
            const index=follower.following.indexOf(userId);
            follower.following.splice(index,1)
            await follower.save()
        }
        for (let i = 0; i < following.length; i++) {
            const follows =await  userModel.findById(following[i]);
            const index=follows.followers.indexOf(userId);
            follows.followers.splice(index,1)
            await follows.save()
        }

        const Allposts=await postModel.find()
        for(let i=0;i<Allposts.length;i++){
            const post =await postModel.findById(Allposts[i]._id)
            for  (let j = 0; j < post.comments.length; j++) {
                if(post.comments[j].user===userId){
                    post.comments.splice(j,1)
                }
            }
            await post.save()
        }
        for(let i=0;i<Allposts.length;i++){
            const post =await postModel.findById(Allposts[i]._id)
            for  (let j = 0; j < post.likes.length; j++) {
                if(post.likes[j]===userId){
                    post.likes.splice(j,1)
                }
            }
            await post.save()
        }

        return res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const myProfile=async(req,res)=>{
    try {
        const user=await   userModel.findById(req.user._id).select("-password").populate("posts followers following");
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const getUserProfile=async(req,res)=>{
    try {
        const user=await userModel.findById(req.params.id).populate("posts followers following");
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const getAllUsers=async(req,res)=>{
    try {
        const users=await  userModel.find({
           name: {$regex:req.query.name,$options:"i"},
        })
        return res.status(200).json({
            success:true,
            users
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const forgotPassword=async(req,res)=>{
    try {
        const user=await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        const resetPasswordToken=user.getRestPasswordToken();
        await user.save()
        const resetUrl=`${req.protocol}://${req.get("host")}/password/reset/${resetPasswordToken}`
        const message=`Reset  your password using this link: \n\n ${resetUrl}`
        try {
            await sendEmail({
                email:user.email,
                subject:"Reset your password",
                message
            })
            return res.status(200).json({
                success:true,
                message:"Reset password link sent to your email"
            })
        } catch (error) {
            user.resetPasswordToken=undefined;
            user.resetPasswordExpires=undefined;
            await user.save()
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const resetPassword=async(req,res)=>{
    try {
        const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex")
        const user=await userModel.findOne({
            resetPasswordToken,
            resetPasswordExpires:{$gt:Date.now()}
        })
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Invalid token or expired"
            })
        }
        user.password=req.body.password;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpires=undefined;
        await user.save()
        res.status(200).json({
            success:true,
            message:"Password reset successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const getMyPosts=async(req,res)=>{
    try {
        const user=await  userModel.findById(req.user._id);
        const posts=[];
        for(let i=0;i<user.posts.length;i++){
            const  post=await postModel.findById(user.posts[i]).populate("owner likes comments.user");
            posts.push(post);
        }
        
        return res.status(200).json({
            success:true,
            posts
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const getUsersPosts=async(req,res)=>{
    try {
        const user=await  userModel.findById(req.params.id);
        const posts=[];
        for(let i=0;i<user.posts.length;i++){
            const  post=await postModel.findById(user.posts[i]).populate("owner likes comments.user");
            posts.push(post);
        }
        
        return res.status(200).json({
            success:true,
            posts
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}