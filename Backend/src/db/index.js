import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connection success ! DB Host : ${connectionInstance.connection.host}`);
        // console.log(connectionInstance);
        
    } catch (error) {
        console.error("MongoDB connection error!", error);
        process.exit(1);
    }
}

export default connectDB;