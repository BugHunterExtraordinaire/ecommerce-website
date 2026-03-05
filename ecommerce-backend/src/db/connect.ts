import mongoose, { Mongoose } from "mongoose";

type ConnectFunction = (url: string) => Promise<Mongoose>;

const connectDB: ConnectFunction = async (url) => {
  return await mongoose.connect(url, {
    dbName: 'ECOMMERCE-DB'
  })
}

export default connectDB;