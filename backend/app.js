import { config } from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";
import cors from "cors"
const app=express();
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb',extended:false}))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());
app.use("/api/v1",postRouter)
app.use("/api/v1",userRouter)

if(process.env.NODE_ENV !== "production"){
    config({path:".env"})
}
app.get("/",(req,res)=>{
    res.send("Hello world")
})
export default app;