import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensureUserPermissionMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const requestId: number = parseInt(req.params.id);

  const userId: number = parseInt(res.locals.user.id);

  const admin: boolean = res.locals.user.admin;

  if (!admin && requestId !== userId) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

export { ensureUserPermissionMiddlewares };
