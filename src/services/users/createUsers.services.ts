import bcryp from "bcryptjs";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import {
  TUserRequest,
  TUserRequestPost,
  TUserResponse,
} from "../../interfaces/users.interfaces";
import {
  requestPostUserSchema,
  responseUserSchema,
} from "../../schemas/users.schemas";

const CreateUserService = async (
  userData: TUserRequest
): Promise<TUserResponse> => {
  const hasPassword: string = await bcryp.hash(userData.password, 10);
  userData.password = hasPassword;

  const data: TUserRequestPost = requestPostUserSchema.parse(userData);

  const queryString = format(
    `
    INSERT INTO
        users(%I)
    VALUES
        (%L)
    RETURNING
        *;
  `,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryString
  );

  const newUser: TUserResponse = responseUserSchema.parse(queryResult.rows[0]);

  return newUser;
};

export { CreateUserService };
