import { UnauthorizedException } from "@/exceptions";
import { NextFunction, Request, Response } from "express";

export const authorizationMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    throw new UnauthorizedException();
  }

  next();
};
