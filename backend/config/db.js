import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://rodgers:56789@cluster0.mwc4v.mongodb.net/yarn');
        console.log("DB connected");
    } catch (err) {
        console.error("DB connection error", err);
    }
};