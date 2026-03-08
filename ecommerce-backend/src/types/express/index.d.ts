import mongoose from 'mongoose';
import * as express from "express";
import { default as DefaultController } from './controller';

declare global {
  namespace Express {
    interface Request {
      userId?: mongoose.Types.ObjectId,
      product?: {
        productId: mongoose.Types.ObjectId,
        price: number,
        quantity: number,
      }
    }
  }
}

export type StartFunction = () => Promise<void>;