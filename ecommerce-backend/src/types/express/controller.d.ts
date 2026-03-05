import * as express from "express";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

type DefaultController = (req: Request, res: Response, next?: NextFunction) => Promise<void>;

declare global {
  namespace Express {
    interface Request {
      userId?: mongoose.Types.ObjectId
    }
  }
}

export default DefaultController;