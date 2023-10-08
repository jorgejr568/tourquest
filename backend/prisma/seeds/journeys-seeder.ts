import { PrismaJourneyRepository } from "@/repositories";
import { PrismaClient } from "@prisma/client";
import { JOURNEY_SEED_DATA } from "./data";

export default async function seedJourneys(client: PrismaClient) {
  await client.userCompletedCheckpoints.deleteMany({});
  await client.journeyCheckpoint.deleteMany({});
  await client.checkpoint.deleteMany({});
  await client.journey.deleteMany({});
  await client.location.deleteMany({
    where: {
      OR: [
        {
          checkpointId: {
            not: null,
          },
        },
        {
          journeyId: {
            not: null,
          },
        },
      ],
    },
  });

  const journeys = JOURNEY_SEED_DATA.map(
    ({ title, description, shortDescription, image }) => ({
      title,
      shortDescription,
      description,
      image,
    })
  );

  const repository = new PrismaJourneyRepository(client);

  for (const journey of journeys) {
    if (await repository.exists(journey.title)) {
      console.log(`Journey with title ${journey.title} already exists`);
      continue;
    }

    await repository.create(journey);
  }
}
