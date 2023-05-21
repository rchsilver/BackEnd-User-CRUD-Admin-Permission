import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const ensureBodyIsValidMiddleware =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const data = schema.parse(req.body);
    req.body = data;
    return next();
  };

export { ensureBodyIsValidMiddleware };
