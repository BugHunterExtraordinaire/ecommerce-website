import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { 
  ErrorHandlerFunction, 
  ErrorObject 
} from "../types/express/error";

const handleError: ErrorHandlerFunction = (err, req, res, next) => {
  const errObj: ErrorObject = {
    message: err.message || 'Something went wrong please try agian later!',
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  }
  if (err instanceof mongoose.Error.ValidationError) {
   let message = [];
    for (const error in err.errors) {
      message.push(err.errors[error].message); 
    }
    errObj.message = message.join(", ");
    errObj.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err instanceof mongoose.Error.CastError) {
    errObj.statusCode = StatusCodes.BAD_REQUEST;
    errObj.message = err.message;
  }
  if (err?.errorResponse?.code === 11000) {
    errObj.statusCode = StatusCodes.BAD_REQUEST;
    errObj.message = "Value already present";
  }
  return res.status(errObj.statusCode).json({
    message: errObj.message
  })
}

export default handleError;