import express from "express";
import { deleteUser, followUser, forgotPassword, getAllUsers, getMyPosts, getUserProfile, getUsersPosts, login, logout, myProfile, register, resetPassword, updatePassword, updateProfile } from "../Controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";
const userRouter=express.Router();
userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/follow/:id",isAuthenticated,followUser)
userRouter.get("/logout",logout)
userRouter.put("/update/password",isAuthenticated,updatePassword)
userRouter.put("/update/profile",isAuthenticated,updateProfile)
userRouter.delete("/delete/me",isAuthenticated,deleteUser)
userRouter.get("/me",isAuthenticated,myProfile)
userRouter.get("/user/:id",isAuthenticated,getUserProfile)
userRouter.get("/users",isAuthenticated,getAllUsers)
userRouter.post("/forgot/password",forgotPassword)
userRouter.put("/password/reset/:token",resetPassword)
userRouter.get("/my/posts",isAuthenticated,getMyPosts)
userRouter.get("/userposts/:id",isAuthenticated,getUsersPosts)
export default userRouter