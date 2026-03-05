import { StatusCodes } from "http-status-codes";
import { 
  ErrorHandlerFunction, 
  ErrorObject 
} from "../types/express/error";

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