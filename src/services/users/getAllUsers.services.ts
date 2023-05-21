import { QueryResult } from "pg";
import { client } from "../../database";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { requestAllUsersSchema } from "../../schemas/users.schemas";

const GetAllUsersService = async (): Promise<Array<TUserResponse>> => {
  const queryString: string = `
      SELECT
        *
      FROM
        users;
    `;

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryString
  );

  const users: TUserResponse[] = requestAllUsersSchema.parse(queryResult.rows);

  return users;
};

export { GetAllUsersService };
