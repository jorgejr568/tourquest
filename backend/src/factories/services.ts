import { Factory } from "./_base";
import {
  DefaultJourneyService,
  DefaultLocationService,
  DefaultUserService,
  JourneyService,
  LocationService,
  UserService,
} from "@/services";
import {
  checkpointRepositoryFactory,
  journeyRepositoryFactory,
  locationRepositoryFactory,
  userRepositoryFactory,
} from "./repositories";
import { infraTokenizationFactory } from "./infra";

export const userServiceFactory: Factory<UserService> = () =>
  new DefaultUserService(
    userRepositoryFactory(),
    infraTokenizationFactory(),
    checkpointRepositoryFactory()
  );

export const journeyServiceFactory: Factory<JourneyService> = () =>
  new DefaultJourneyService(
    journeyRepositoryFactory(),
    checkpointRepositoryFactory()
  );

export const locationServiceFactory: Factory<LocationService> = () =>
  new DefaultLocationService(locationRepositoryFactory());
