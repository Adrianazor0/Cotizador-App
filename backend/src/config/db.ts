import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || '');
        
        console.log(`[database]: MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`[database]: Error connection: ${(error as Error).message}`);
        process.exit(1);
    }
};

