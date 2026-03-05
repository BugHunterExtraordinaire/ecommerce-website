import mongoose, { Mongoose } from "mongoose";
import { ConnectFunction } from "../types/mongoose/connection/connect";

const connectDB: ConnectFunction = async (url) => {
  return await mongoose.connect(url, {
    dbName: 'ECOMMERCE-DB'
  })
}

export default connectDB;