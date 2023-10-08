import { infraTokenizationFactory } from "@/factories/infra";
import { Tokenization } from "@/infra/tokenization";
import { NextFunction, Request, Response } from "express";

export const tokenizationMiddleware =
  (tokenization: Tokenization = infraTokenizationFactory()) =>
  (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers["authorization"]?.split(" ")?.pop();

    if (authorization) {
      try {
        req.user = tokenization.verify(authorization);
      } catch (InvalidTokenException) {
        req.user = undefined;
      }
    }

    return next();
  };
