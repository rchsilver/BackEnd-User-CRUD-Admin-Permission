import { Router } from "express";
import {
  CreateUserControllers,
  GetAllUsersControllers,
  GetUserControllers,
  getProfileUserController,
  updateUsersController,
  deleteUsersController,
  revoreUsersController,
} from "../controllers/user.controllers";
import { ensureBodyIsValidMiddleware } from "../middlewares/ensureBodyIsValid.middlewares";
import { ensureEmailNotExistsMiddleware } from "../middlewares/ensureEmailNotExists.middlewares";
import { ensureTokenIsAdminMiddleware } from "../middlewares/ensureTokenIsAdmin.middlewares";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middlewares";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middlewares";
import { ensureUserPermissionMiddlewares } from "../middlewares/ensureUserPermission.middlewares";
import {
  requestUserSchema,
  responsePatchUserSchema,
} from "../schemas/users.schemas";

const userRouter: Router = Router();

userRouter.post(
  "",
  ensureBodyIsValidMiddleware(requestUserSchema),
  ensureEmailNotExistsMiddleware,
  CreateUserControllers
);

userRouter.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureTokenIsAdminMiddleware,
  GetAllUsersControllers
);

userRouter.get(
  "/profile",
  ensureTokenIsValidMiddleware,
  getProfileUserController
);

userRouter.get("/profile/:id", ensureUserExistsMiddleware, GetUserControllers);

userRouter.patch(
  "/:id",
  ensureBodyIsValidMiddleware(responsePatchUserSchema),
  ensureUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensureUserPermissionMiddlewares,
  updateUsersController
);

userRouter.delete(
  "/:id",
  ensureUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensureUserPermissionMiddlewares,
  deleteUsersController
);

userRouter.put(
  "/:id/recover",
  ensureUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensureTokenIsAdminMiddleware,
  revoreUsersController
);

export default userRouter;
