import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../error";
import {
  TLoginRequest,
  TLoginResponse,
} from "../../interfaces/login.interfaces";
import { TUser } from "../../interfaces/users.interfaces";
import bcryp from "bcryptjs";
import jwt from "jsonwebtoken";

const createLoginService = async (
  payload: TLoginRequest
): Promise<TLoginResponse> => {
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
    values: [payload.email],
  };

  const queryResult: QueryResult<TUser> = await client.query(queryConfig);
  const user: TUser = queryResult.rows[0];

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const comparePassword = await bcryp.compare(
    payload.password,
    queryResult.rows[0].password
  );

  if (comparePassword === false) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = jwt.sign(
    {
      id: user.id,
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: user.id.toString(),
    }
  );
  return { token };
};

export { createLoginService };
