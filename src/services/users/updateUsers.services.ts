import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { TUpdateUserRequest, TUser } from "../../interfaces/users.interfaces";
import { responsePatchUserSchema } from "../../schemas/users.schemas";

const updateUserService = async (
  requestId: number,
  userData: TUpdateUserRequest
) => {
  const queryString: string = format(
    `
    UPDATE
      users
    SET (%I) = ROW(%L)
    WHERE
      id = $1
    RETURNING
      *;
	`,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [requestId],
  };

  const queryResult: QueryResult<TUser> = await client.query(queryConfig);
  const user = responsePatchUserSchema.parse(queryResult.rows[0]);

  return user;
};

export { updateUserService };
