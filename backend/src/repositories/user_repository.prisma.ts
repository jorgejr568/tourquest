import { User } from "@/dtos";
import { UserRepository } from "./user_repository";
import { PrismaClient, User as UserDocument } from "@prisma/client";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly client = new PrismaClient()) {}

  findUserByEmail = async (email: string): Promise<User | null> => {
    const user = await this.client.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return null;
    }

    return this._prismaUserToDto(user);
  };

  private _prismaUserToDto(user: UserDocument): User {
    return new User({
      id: user.id,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
