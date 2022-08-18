import { customApiErrors } from "../errors/custom-api-errors.js";

export const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof customApiErrors) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
};
