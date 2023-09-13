import {
  PrismaCheckpointRepository,
  PrismaJourneyRepository,
} from "@/repositories";
import { PrismaClient } from "@prisma/client";
import { JOURNEY_SEED_DATA } from "./data";

export default async function seedCheckpoints(client: PrismaClient) {
  const checkpoints = JOURNEY_SEED_DATA.map(({ title, checkpoints }) =>
    checkpoints.map((checkpoint) => ({
      ...checkpoint,
      journeyTitle: title,
    }))
  ).flat();

  const checkpointRepository = new PrismaCheckpointRepository(client);
  const journeyRepository = new PrismaJourneyRepository(client);
  for (const checkpoint of checkpoints) {
    let checkpointId = await checkpointRepository.exists(checkpoint.title);
    if (!checkpointId) {
      const createdCheckpoint = await checkpointRepository.create(checkpoint);
      checkpointId = createdCheckpoint.id;
    }

    const journey = await journeyRepository.findByTitle(
      checkpoint.journeyTitle
    );

    if (!journey) {
      console.log(
        `Journey with title ${checkpoint.journeyTitle} does not exist`
      );
      continue;
    }

    await checkpointRepository.assignToJourney(checkpointId, journey.id);
  }
}
