import { z } from "zod";
import {
  requestAllUsersSchema,
  requestPatchUserSchema,
  requestPostUserSchema,
  requestUserSchema,
  responseUserSchema,
  userSchema,
} from "../schemas/users.schemas";

type TUser = z.infer<typeof userSchema>;

type TUserRequest = z.infer<typeof requestUserSchema>;

type TUserRequestPost = z.infer<typeof requestPostUserSchema>;

type TUserResponse = z.infer<typeof responseUserSchema>;

type TUserResponseArray = z.infer<typeof requestAllUsersSchema>;

type TUpdateUserRequest = z.infer<typeof requestPatchUserSchema>;

export {
  TUser,
  TUserRequest,
  TUserResponse,
  TUserResponseArray,
  TUserRequestPost,
  TUpdateUserRequest,
};
