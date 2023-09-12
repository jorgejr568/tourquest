import { Factory } from "./_base";
import { PrismaUserRepository, UserRepository } from "@/repositories";

export const userRepositoryFactory: Factory<UserRepository> = () =>
  new PrismaUserRepository();
