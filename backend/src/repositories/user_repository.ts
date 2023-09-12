import { User } from "@/dtos";

export interface UserRepository {
  findUserByEmail(email: string): Promise<User | null>;
}

