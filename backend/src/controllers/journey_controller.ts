import { journeyServiceFactory } from "@/factories";
import { Router } from "express";
import { JourneyListCheckpointsSchema } from "./schemas";

const journeyRouter = Router();

const journeyService = journeyServiceFactory();

journeyRouter.get("/", async (req, res) => {
  res.json(await journeyService.listJourneys());
});

journeyRouter.get("/:journeyId/checkpoints", async (req, res) => {
  const { journeyId } = JourneyListCheckpointsSchema.parse(req.params);
  res.json(await journeyService.listJourneyCheckpoints(journeyId));
});

export { journeyRouter };
