import express from "express";
import "express-async-errors";
import { Environment } from "@/constants";
import { ExpressHttpExceptionErrorHandler } from "@/exceptions";
import { journeyRouter, userRouter } from "@/controllers";
import { tokenizationMiddleware } from "@/controllers/middlewares";

const app = express();
app.use(express.json());
app.use(tokenizationMiddleware());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/journeys", journeyRouter);

app.get("/status", (_, res) => {
  res.json({ status: "OK" });
});

app.use(ExpressHttpExceptionErrorHandler);

app.listen(Environment.HTTP_PORT, () => {
  console.log(`Server is running: http://localhost:${Environment.HTTP_PORT}`);
});
