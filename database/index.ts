import mongoose from "mongoose";
import { hash, compare } from "bcrypt-ts";

type comparePasswordArgs = {
  password: string;
  dbPassword: string;
};

export const encryptPassword = async (password: string) => {
  const encryptedPassword = await hash(password, 8);
  return encryptedPassword;
};

export const comparePassword = async ({
  password,
  dbPassword,
}: comparePasswordArgs) => {
  return await compare(password, dbPassword);
};

export const connectDB = async (url: string) => {
  try {
    const connect = await mongoose.connect(url);
    console.log("mongodb connected:", connect.connection.host);
  } catch (error) {
    console.error("error connection:", error);
  }
};
