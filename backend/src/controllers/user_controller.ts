import { checkpointServiceFactory, userServiceFactory } from "@/factories";
import { Request, Response, Router } from "express";
import {
  CheckpointMarkAsDoneSchema,
  UserCreateSchema,
  UserLoginSchema,
} from "./schemas";
import { authorizationMiddleware } from "@/controllers/middlewares";

const userService = userServiceFactory();
const checkpointService = checkpointServiceFactory();
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
    res.json(await checkpointService.userListCheckpoints(req.user!.id));
  }
);

userRouter.patch(
  "/checkpoints/:checkpointId",
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    res.json(
      await checkpointService.userMarkCheckpointAsCompleted(
        CheckpointMarkAsDoneSchema.parse({
          userId: req.user!.id,
          checkpointId: req.params.checkpointId,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
        })
      )
    );
  }
);

userRouter.post("/", async (req: Request, res: Response) => {
  res.json(await userService.signUp(UserCreateSchema.parse(req.body)));
});

export { userRouter };
