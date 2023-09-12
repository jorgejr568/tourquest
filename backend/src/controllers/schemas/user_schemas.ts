import { z } from "zod";

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

