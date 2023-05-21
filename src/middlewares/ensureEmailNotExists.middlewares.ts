import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";

const ensureEmailNotExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email }: { email: string } = req.body;
  const queryString: string = `
    SELECT
      *
    FROM
      users
    WHERE
      email = $1;
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (queryResult.rowCount > 0) {
    return res.status(409).json({
      message: "E-mail already registered",
    });
  }

  return next();
};

export { ensureEmailNotExistsMiddleware };
