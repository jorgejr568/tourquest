import { z } from "zod";

export const UserLoginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8),
});

export const UserCreateSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8),
  name: z.string().min(3).max(255),
});
