import { User, UserCreateRequest } from "@/dtos";

export interface UserRepository {
  findUserByEmail(email: string): Promise<User | null>;
  create(request: UserCreateRequest): Promise<User>;
}
