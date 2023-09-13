import { PrismaClient } from "@prisma/client";
import { Factory } from "./_base";
import {
  CheckpointRepository,
  JourneyRepository,
  LocationRepository,
  PrismaCheckpointRepository,
  PrismaJourneyRepository,
  PrismaLocationRepository,
  PrismaUserRepository,
  UserRepository,
} from "@/repositories";

const prisma = new PrismaClient();

export const userRepositoryFactory: Factory<UserRepository> = () =>
  new PrismaUserRepository(prisma);

export const journeyRepositoryFactory: Factory<JourneyRepository> = () =>
  new PrismaJourneyRepository(prisma);

export const checkpointRepositoryFactory: Factory<CheckpointRepository> = () =>
  new PrismaCheckpointRepository(prisma);

export const locationRepositoryFactory: Factory<LocationRepository> = () =>
  new PrismaLocationRepository(prisma);
