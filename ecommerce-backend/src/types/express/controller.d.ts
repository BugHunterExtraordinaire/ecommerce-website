import { Request, Response } from "express";

type DefaultController = (req: Request, res: Response) => void

export default DefaultController;