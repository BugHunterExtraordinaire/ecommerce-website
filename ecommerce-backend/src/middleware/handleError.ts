import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

type CustomError = APIError | mongoose.Error;
type ErrorHandlerFunction = (err: CustomError, req: Request, res: Response, next: NextFunction) => void;
type ErrorObject = {
  message: string,
  statusCode: number
};

const handleError: ErrorHandlerFunction = (err, req, res, next) => {
  const errObj: ErrorObject = {
    message: err.message || 'Something went wrong please try agian later!',
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  }
  return res.status(errObj.statusCode).json({
    message: errObj.message
  })
}

export default handleError;