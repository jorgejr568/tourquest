import { Factory } from "./_base";
import {
  DefaultJourneyService,
  DefaultUserService,
  JourneyService,
  UserService,
} from "@/services";
import {
  checkpointRepositoryFactory,
  journeyRepositoryFactory,
  userRepositoryFactory,
} from "./repositories";
import { infraTokenizationFactory } from "./infra";

export const userServiceFactory: Factory<UserService> = () =>
  new DefaultUserService(userRepositoryFactory(), infraTokenizationFactory());

export const journeyServiceFactory: Factory<JourneyService> = () =>
  new DefaultJourneyService(
    journeyRepositoryFactory(),
    checkpointRepositoryFactory()
  );
