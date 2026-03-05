import { Request, Response, NextFunction } from "express";
import { APIError } from "../../errors";

export type ErrorHandlerFunction = (err: APIError, req: Request, res: Response, next: NextFunction) => void;
export type ErrorObject = {
  message: string,
  statusCode: number
};