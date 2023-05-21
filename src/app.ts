import "express-async-errors";
import express, { Application, json } from "express";
import userRouter from "./routes/users.routes";
import { handleErrors } from "./error";
import loginRouter from "./routes/login.routes";

const app: Application = express();
app.use(json());

app.use("/users", userRouter);
app.use("/login", loginRouter);

app.use(handleErrors);

export default app;
