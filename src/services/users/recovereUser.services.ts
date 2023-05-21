import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../error";
import { TUser } from "../../interfaces/users.interfaces";
import { responseUserSchema } from "../../schemas/users.schemas";

const recovereUserService = async (requestId: number) => {
  const queryString: string = `
	UPDATE
		users
 	SET
		active = true
	WHERE
		id = $1
	AND
		active = false
	RETURNING
		*;
`;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [requestId],
  };
  const queryResult: QueryResult<TUser> = await client.query(queryConfig);
  if (queryResult.rowCount === 0) {
    throw new AppError("User already active", 400);
  }

  const user = responseUserSchema.parse(queryResult.rows[0]);

  return user;
};

export { recovereUserService };
