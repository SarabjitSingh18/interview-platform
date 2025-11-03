import mongoose from 'mongoose';
import {ENV} from "./env.js";
export const connectDB = async () => {
    try {
        if(!ENV.MONGO_URI){
            throw new Error("MONGO_URI is not defined");
        }
        const conn = await mongoose.connect(ENV.MONGO_URI);
         console.log("✅ Connected to MongoDB:", conn.connection.host);
    } catch (error) {
        console.log(error);
         process.exit(1); 
    }
};