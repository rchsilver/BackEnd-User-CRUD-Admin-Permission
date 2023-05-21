import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensureTokenIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const admin: boolean = res.locals.user.admin;

  if (!admin) {
    throw new AppError("Insufficient Permission", 403);
  }
  return next();
};

export { ensureTokenIsAdminMiddleware };
