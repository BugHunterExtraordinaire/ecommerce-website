import { NextFunction, Request, Response } from "express";

type DefaultController = (req: Request, res: Response, next?: NextFunction) => Promise<void>;

export default DefaultController;