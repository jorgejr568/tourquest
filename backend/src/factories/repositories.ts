import { Factory } from "./_base";
import {
  CheckpointRepository,
  JourneyRepository,
  PrismaCheckpointRepository,
  PrismaJourneyRepository,
  PrismaUserRepository,
  UserRepository,
} from "@/repositories";

export const userRepositoryFactory: Factory<UserRepository> = () =>
  new PrismaUserRepository();

export const journeyRepositoryFactory: Factory<JourneyRepository> = () =>
  new PrismaJourneyRepository();

export const checkpointRepositoryFactory: Factory<CheckpointRepository> = () =>
  new PrismaCheckpointRepository();
