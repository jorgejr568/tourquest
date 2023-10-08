import { PrismaClient } from "@prisma/client";
import { USERS_SEED_DATA } from "./data";

export default async function seedUsers(client: PrismaClient) {
  for (const user of USERS_SEED_DATA) {
    await client.user.upsert({
      where: {
        email: user.email,
      },
      update: {},
      create: {
        ...user,
        password: await Bun.password.hash(user.password),
      },
    });
  }
}
