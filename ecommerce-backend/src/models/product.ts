import { Schema, model } from "mongoose";
import { IProduct } from "../types/mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
  },
  catergory: {
    type: String,
    required: true,
    enum: ["Clothing", "Electronics and Hardware", "Produce", 
           "Books", "Kitchen", "Video Games"],
  },
  images: [
    {
      type: String,
      trim: true,
    }
  ],
  stock: {
    type: Number,
    min: 0,
  },
  rating: {
    type: Number,
    min: 0.01,
    max: 5,
  },
  numOfReviews: {
    type: Number,
    trim: true,
  }
}, {
  timestamps: true
});

export default model<IProduct>("Product", productSchema);