import mongoose from "mongoose";

export const connectDB = async (url: string) => {
  try {
    const connect = await mongoose.connect(url);
    console.log("mongodb connected:", connect.connection.host);
  } catch (error) {
    console.error("error connection:", error);
  }
};
