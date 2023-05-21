import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../error";
import { TUser, TUserResponse } from "../../interfaces/users.interfaces";
import { responseUserSchema } from "../../schemas/users.schemas";

const GetProfileService = async (userId: number): Promise<TUserResponse> => {
  const queryString: string = `
    SELECT
      *
    FROM
      users
    WHERE
      id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult<TUser> = await client.query(queryConfig);
  const getUser = responseUserSchema.parse(queryResult.rows[0]);

  if (!getUser) {
    throw new AppError("User not found", 404);
  }

  return getUser;
};

export { GetProfileService };
