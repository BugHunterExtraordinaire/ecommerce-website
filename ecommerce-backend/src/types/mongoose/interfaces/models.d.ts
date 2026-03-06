import mongoose, { Document } from "mongoose";

type ProductArrayItem = {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  verifyPassword(password: string): Promise<boolean>;
  generateJwt(): string;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  catergory: string;
  images: Array<string>;
  stock: number;
  rating: number;
  numOfReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  products: Array<ProductArrayItem>;
  total: number;
}