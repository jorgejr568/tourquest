import { Factory } from "./_base";
import {
  JourneyRepository,
  PrismaJourneyRepository,
  PrismaUserRepository,
  UserRepository,
} from "@/repositories";

export const userRepositoryFactory: Factory<UserRepository> = () =>
  new PrismaUserRepository();

export const journeyRepositoryFactory: Factory<JourneyRepository> = () =>
  new PrismaJourneyRepository();
