import { z } from "zod";

export const CheckpointMarkAsDoneSchema = z.object({
  checkpointId: z.string().uuid(),
  userId: z.string().uuid(),
  latitude: z.number(),
  longitude: z.number(),
});
