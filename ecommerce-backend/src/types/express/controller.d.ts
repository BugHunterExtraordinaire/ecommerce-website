import * as express from "express";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export type DefaultController = (req: Request, res: Response) => Promise<void>;
export type DefaultMiddleware = (req: Request, res: Response, next: NextFunction) => void;

declare global {
  namespace Express {
    interface Request {
      userId?: mongoose.Types.ObjectId
    }
  }
}