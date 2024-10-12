import mongoose from "mongoose";
const connectDb=async()=>{
    const {connection} = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected ${connection.host}`);
}
export default connectDb;