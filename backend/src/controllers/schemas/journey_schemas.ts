import { z } from "zod";

export const JourneyListCheckpointsSchema = z.object({
  journeyId: z.string().uuid(),
});
