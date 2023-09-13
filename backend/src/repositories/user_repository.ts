import { User, UserCreateRequest } from "@/dtos";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(request: UserCreateRequest): Promise<User>;
}
