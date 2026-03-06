class APIError extends Error {
  errorResponse?: {
    code?: number
  }
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default APIError;