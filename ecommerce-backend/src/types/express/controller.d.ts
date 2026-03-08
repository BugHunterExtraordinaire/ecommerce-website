import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

type DefaultController = (req: Request, res: Response, next?: NextFunction) => Promise<void>;

export {
  DefaultController
};