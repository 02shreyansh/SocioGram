import express from "express";
import { commentOnPost, createPost, deleteComment, deletePost, getPostOfFollowing, likeAndUnlikePost, updateCaption } from "../Controllers/post.js";
import { isAuthenticated } from "../middleware/auth.js";
const postRouter=express.Router();
postRouter.route("/post/upload").post(isAuthenticated,createPost)
postRouter.get("/post/:id",isAuthenticated,likeAndUnlikePost)
postRouter.delete("/post/:id",isAuthenticated,deletePost)
postRouter.get("/posts",isAuthenticated,getPostOfFollowing)
postRouter.put("/post/:id",isAuthenticated,updateCaption)
postRouter.put("/post/comment/:id",isAuthenticated,commentOnPost)
postRouter.delete("/post/comment/:id",isAuthenticated,deleteComment)
export default postRouter