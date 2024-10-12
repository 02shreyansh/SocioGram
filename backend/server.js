import app from "./app.js";
import connectDb from "./Config/database.js"
import cloudinary from "cloudinary"
connectDb()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET,
})
app.listen(process.env.PORT,()=>{
    console.log("server is running on port "+process.env.PORT);
})



