import * as express from "express";
import { default as DefaultController } from './controller';

declare global {
  namespace Express {
    interface Request {
      userId?: mongoose.Types.ObjectId
    }
  }
}

export type StartFunction = () => Promise<void>;

export {
  DefaultController
}