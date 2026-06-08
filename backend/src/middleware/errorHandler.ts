import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    error: {
      status,
      message,
    },
  });
};

export default errorHandler;
