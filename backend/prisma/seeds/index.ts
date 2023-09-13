import { PrismaClient } from "@prisma/client";
import seedJourneys from "./journeys-seeder";
import seedCheckpoints from "./checkpoints-seeder";

const client = new PrismaClient();
try {
  await seedJourneys(client);
  await seedCheckpoints(client);
} catch (error) {
  console.error(error);
} finally {
  await client.$disconnect();
}
