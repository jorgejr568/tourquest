import { Factory } from "./_base";
import {
  CheckpointService,
  DefaultCheckpointService,
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
import { infraGeoDistanceFactory, infraTokenizationFactory } from "./infra";

export const userServiceFactory: Factory<UserService> = () =>
  new DefaultUserService(userRepositoryFactory(), infraTokenizationFactory());

export const journeyServiceFactory: Factory<JourneyService> = () =>
  new DefaultJourneyService(
    journeyRepositoryFactory(),
    checkpointRepositoryFactory(),
  );

export const checkpointServiceFactory: Factory<CheckpointService> = () =>
  new DefaultCheckpointService(
    checkpointRepositoryFactory(),
    infraGeoDistanceFactory(),
  );

export const locationServiceFactory: Factory<LocationService> = () =>
  new DefaultLocationService(locationRepositoryFactory());
