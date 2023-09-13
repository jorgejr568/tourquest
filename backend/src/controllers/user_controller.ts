import { userServiceFactory } from "@/factories";
import { Request, Response, Router } from "express";
import { UserLoginSchema } from "./schemas";
import { authorizationMiddleware } from "@/controllers/middlewares";

const userService = userServiceFactory();
const userRouter = Router();

userRouter.post("/auth", async (req: Request, res: Response) => {
  const { email, password } = UserLoginSchema.parse(req.body);
  const response = await userService.signIn({ email, password });

  res.json(response);
});

userRouter.get(
  "/auth",
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    res.json(req.user);
  }
);

userRouter.get(
  "/checkpoints",
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    res.json(await userService.listCheckpoints(req.user!.id));
  }
);

export { userRouter };
