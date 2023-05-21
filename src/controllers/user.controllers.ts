import { Request, Response } from "express";
import {
  TUpdateUserRequest,
  TUserRequest,
  TUserResponse,
} from "../interfaces/users.interfaces";
import { requestUserSchema } from "../schemas/users.schemas";
import { CreateUserService } from "../services/users/createUsers.services";
import { GetAllUsersService } from "../services/users/getAllUsers.services";
import { GetProfileService } from "../services/users/getUserProfile.services";
import { GetUserService } from "../services/users/getUser.services";
import { updateUserService } from "../services/users/updateUsers.services";
import { deleteUserService } from "../services/users/deleteUser.services";
import { recovereUserService } from "../services/users/recovereUser.services";

const CreateUserControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = requestUserSchema.parse(req.body);
  const newUser: TUserResponse = await CreateUserService(userData);
  return res.status(201).json(newUser);
};

const GetAllUsersControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await GetAllUsersService();
  return res.status(200).json(users);
};

const GetUserControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await GetUserService(res.locals.user);

  return res.status(200).json(user);
};

const updateUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const requestId: number = parseInt(req.params.id);

  const userData: TUpdateUserRequest = req.body;

  const updatedUser = await updateUserService(requestId, userData);

  return res.json(updatedUser);
};

const deleteUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const requestId: number = parseInt(req.params.id);

  await deleteUserService(requestId);

  return res.status(204).send();
};

const revoreUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const requestId: number = parseInt(req.params.id);

  const user = await recovereUserService(requestId);

  return res.status(200).json(user);
};

const getProfileUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(res.locals.user.id);

  const updatedUser = await GetProfileService(userId);

  return res.json(updatedUser);
};

export {
  CreateUserControllers,
  GetAllUsersControllers,
  GetUserControllers,
  updateUsersController,
  getProfileUserController,
  deleteUsersController,
  revoreUsersController,
};
