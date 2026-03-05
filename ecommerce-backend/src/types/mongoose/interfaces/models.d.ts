import { Document } from "mongoose";

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