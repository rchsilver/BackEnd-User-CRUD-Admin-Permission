import { Router } from "express";
import { loginControllers } from "../controllers/login.controllers";

const loginRouter = Router();

loginRouter.post("", loginControllers);

export default loginRouter;
