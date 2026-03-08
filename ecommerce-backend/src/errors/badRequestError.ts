import { StatusCodes } from "http-status-codes";
import { APIError } from "./";

class BadRequestError extends APIError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export default BadRequestError