import { Environment } from "@/constants";
import { ErrorRequestHandler, Request, Response } from "express";
import { ZodError } from "zod";

export abstract class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }

  public toJSON(): Record<string, unknown> {
    return {
      message: this.message,
      status: this.status,
    };
  }
}

export const ExpressHttpExceptionErrorHandler: ErrorRequestHandler = (
  err: Error,
  _: Request,
  res: Response,
) => {
  if (err instanceof HttpException) {
    res.status(err.status).json({
      ...err.toJSON(),
      ...prepareStack(err.stack),
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(422).json({
      message: Object.fromEntries(
        err.errors.map((error) => [error.path.join("."), error.message]),
      ),
      status: 422,
      ...prepareStack(err.stack),
    });
    return;
  }

  res.status(500).json({
    message: "Internal Server Error",
    status: 500,
    ...prepareStack(err.stack),
  });
};

const prepareStack = (
  stack: Error["stack"],
): Record<"stack", string[]> | undefined => {
  if (Environment.isProduction || !stack) {
    return undefined;
  }

  return {
    stack: stack.split("\n").map((line) => line.trim()),
  };
};
