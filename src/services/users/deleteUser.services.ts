import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { TUser } from "../../interfaces/users.interfaces";

const deleteUserService = async (requestId: number) => {
  const queryString: string = `
	UPDATE
		users
	SET
		active = false
	WHERE
		id = $1
	RETURNING
		*;
	`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [requestId],
  };

  const queryResult: QueryResult<TUser> = await client.query(queryConfig);

  return queryResult.rows[0];
};

export { deleteUserService };
