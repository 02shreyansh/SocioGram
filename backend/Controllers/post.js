import { postModel } from "../models/Post.js"
import { userModel } from "../models/User.js"
import cloudinary from "cloudinary"
export const createPost=async (req,res)=>{
    try {
        const myCloud=await cloudinary.v2.uploader.upload(req.body.image,{
            folder:"posts"
        });

        const newpPostData={
            caption:req.body.caption,
            image:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
            },
            owner:req.user._id
        }
        const newPost=await  postModel.create(newpPostData);
        const user=await userModel.findById(req.user._id);
        user.posts.unshift(newPost._id);
        await user.save()
        res.status(201).json({
            success:true,
            message:"Post Created"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}
export const deletePost=async(req,res)=>{
    try {
        const  post=await postModel.findById(req.params.id);
        if(!post) {
            return res.status(404).json({
                success:false,
                message:"Post not found"
            })
        }
        if(post.owner.toString()!==req.user._id.toString()) {
            return res.status(403).json({
                success:false,
                message:"You can't delete this post"
            });
        }
        await  postModel.findByIdAndDelete(post);

        await cloudinary.v2.uploader.destroy(post.image.public_id)
        const user =await  userModel.findById(req.user._id);
        const index=user.posts.indexOf(req.params._id);
        user.posts.splice(index,1);
        await user.save()
        res.status(200).json({
            success:true,
            message:"Post deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}
export const likeAndUnlikePost=async(req,res)=>{
    try {
        const post=await  postModel.findById(req.params.id);
        if(!post) {
            return res.status(404).json({
                success:false,
                message:"Post not found"
            })
        }
        if(post.likes.includes(req.user._id)){
            const index=post.likes.indexOf(req.user._id);
            post.likes.splice(index,1);
            await post.save()
            return res.status(200).json({
                success:true,
                message:"Post unliked successfully"
            })
        }
        else{
            post.likes.push(req.user._id);
            await post.save()
            return res.status(201).json({
                success:true,
                message:"Post liked successfully"
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}
export const getPostOfFollowing=async(req,res)=>{
    try {
        const user=await userModel.findById(req.user._id);
        const posts=await postModel.find({
            owner:{
                $in:user.following
            }
        }).populate("owner likes comments.user")
        res.status(200).json({
            success:true,
            posts:posts.reverse(),
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}
export const updateCaption=async (req,res)=>{
    try {
        const post =await  postModel.findById(req.params.id);
        if(!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }
        if(post.owner.toString() !== req.user._id.toString()){
            return res.status(403).json({
                success: false,
                message: "You are not the owner of this post",
            })
        }
        post.caption=req.body.caption
        await post.save()
        res.status(200).json({
            success:true,
            message:"Caption updated successfully"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const commentOnPost=async(req,res)=>{
    try {
        const  post=await postModel.findById(req.params.id);
        if(!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }
        let commentIndex=-1;
        post.comments.forEach((item,index)=>{
            if(item.user.toString()===req.user._id.toString()){
                commentIndex=index;
            }
        })
        if(commentIndex!==-1){
            post.comments[commentIndex].comment=req.body.comment
            await post.save()
            res.status(200).json({
                success:true,
                message:"Comment updated successfully"
            })

        }else{
            post.comments.push({
                user:req.user._id,
                comment:req.body.comment,
            })
            await post.save()
            return res.status(200).json({
                success:true,
                message:"Comment added successfully"
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const deleteComment=async(req,res)=>{
    try {
        const post=await postModel.findById(req.params.id);
        if(!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }
        if(post.owner.toString() === req.user._id.toString()){
            if(req.body.commentId==undefined){
                return res.status(400).json({
                    success:false,
                    message:"Comment id is required"
                })
            }
            post.comments.forEach((item,index)=>{
                if(item._id.toString()===req.body.commentId.toString()){
                   return post.comments.splice(index,1)
                }
            })
            await post.save()
            return res.status(200).json({
                success:true,
                message:"Comment deleted successfully"
            })
        }
        else{
            post.comments.forEach((item,index)=>{
                if(item.user.toString()===req.user._id.toString()){
                   return post.comments.splice(index,1)
                }
            })
            await post.save()
            return res.status(200).json({
                success:true,
                message:"Your Comment deleted successfully"
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
