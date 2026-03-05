import { Request, Response } from "express";

type DefaultController = (req: Request, res: Response) => Promise<void>;

export default DefaultController;