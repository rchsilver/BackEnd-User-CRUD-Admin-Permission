import { TUser, TUserResponse } from "../../interfaces/users.interfaces";
import { responseUserSchema } from "../../schemas/users.schemas";

const GetUserService = async (user: TUser): Promise<TUserResponse> => {
  const userResponse = responseUserSchema.parse(user);
  return userResponse;
};

export { GetUserService };
