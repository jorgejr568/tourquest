import { Factory } from "./_base";
import {
  DefaultJourneyService,
  DefaultLocationService,
  DefaultUserService,
  JourneyService,
  LocationService,
  UserService,
  CheckpointService,
  DefaultCheckpointService,
} from "@/services";
import {
  checkpointRepositoryFactory,
  journeyRepositoryFactory,
  locationRepositoryFactory,
  userRepositoryFactory,
} from "./repositories";
import { infraTokenizationFactory } from "./infra";
import {} from "@/services/checkpoint_service";

export const userServiceFactory: Factory<UserService> = () =>
  new DefaultUserService(userRepositoryFactory(), infraTokenizationFactory());

export const journeyServiceFactory: Factory<JourneyService> = () =>
  new DefaultJourneyService(
    journeyRepositoryFactory(),
    checkpointRepositoryFactory()
  );

export const checkpointServiceFactory: Factory<CheckpointService> = () =>
  new DefaultCheckpointService(checkpointRepositoryFactory());

export const locationServiceFactory: Factory<LocationService> = () =>
  new DefaultLocationService(locationRepositoryFactory());
