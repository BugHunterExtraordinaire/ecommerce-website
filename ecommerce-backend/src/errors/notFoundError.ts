import { StatusCodes } from "http-status-codes";
import { APIError } from "./";

class NotFoundError extends APIError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export default NotFoundError;