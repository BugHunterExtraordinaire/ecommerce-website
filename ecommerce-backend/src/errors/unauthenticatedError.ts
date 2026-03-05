import { StatusCodes } from "http-status-codes";
import { APIError } from "./";

class UnAuthenticatedError extends APIError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export default UnAuthenticatedError