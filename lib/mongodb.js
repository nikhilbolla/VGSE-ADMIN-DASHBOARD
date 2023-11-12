import mongoose from "mongoose";

export const connectMongoDB = async () => {
    const connection = {};
    try {
        if(connection.isConnected) return;
        const db = await mongoose.connect(process.env.MONGODB_URI);
        connection.isConnected = db.connections[0].readyState;
        console.log("connected to mongoBD")
    } catch (error) {
        console.log("Error", error);  
    }
} 