import express from "express";
import "express-async-errors";
import { Environment } from "@/constants";
import { PrismaUserRepository } from "@/repositories";
import {
  CredentialsNotMatchException,
  ExpressHttpExceptionErrorHandler,
} from "./exceptions";
import { userRouter } from "./controllers";
import { tokenizationMiddleware } from "./controllers/middlewares";

const app = express();
app.use(express.json());
app.use(tokenizationMiddleware());

app.use("/api/v1/users", userRouter);

app.get("/status", (_, res) => {
  res.json({ status: "OK" });
});

const repo = new PrismaUserRepository();
app.get("/users/:email", async (req, res) => {
  const user = await repo.findUserByEmail(req.params.email);
  if (!user) {
    throw new CredentialsNotMatchException();
  }

  res.json(user);
});

app.use(ExpressHttpExceptionErrorHandler);

app.listen(Environment.PORT, () => {
  console.log(`Server is running: http://localhost:${Environment.PORT}`);
});
