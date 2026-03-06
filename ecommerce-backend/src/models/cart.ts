import mongoose, { Schema, model } from "mongoose";
import { ICart } from '../types/mongoose/interfaces/models';

const cartSchema: Schema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    require: true,
    unique: true,
    ref: "User",
  },
  products: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        unique: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: Number,
      
    },
  ],
  total: Number
});

cartSchema.pre('save', function(this: ICart) {
  this.total = this.products.reduce((prev, current) => prev += current.price, 0);
});

export default model<ICart>("Cart", cartSchema);