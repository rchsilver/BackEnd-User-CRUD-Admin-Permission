import { Request, Response } from "express";
import { TLoginRequest, TLoginResponse } from "../interfaces/login.interfaces";
import { requestLoginSchema } from "../schemas/login.schemas";
import { createLoginService } from "../services/login/createLogin.services";

const loginControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TLoginRequest = requestLoginSchema.parse(req.body);

  const token: TLoginResponse = await createLoginService(userData);

  return res.status(200).json(token);
};

export { loginControllers };
