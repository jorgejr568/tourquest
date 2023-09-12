import { Factory } from "./_base";
import { DefaultUserService, UserService } from "@/services";
import { userRepositoryFactory } from "./repositories";
import { infraTokenizationFactory } from "./infra";

export const userServiceFactory: Factory<UserService> = () =>
  new DefaultUserService(userRepositoryFactory(), infraTokenizationFactory());

