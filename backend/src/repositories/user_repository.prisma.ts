import { User, UserCreateRequest } from "@/dtos";
import { UserRepository } from "./user_repository";
import { PrismaClient, User as UserDocument } from "@prisma/client";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly client: PrismaClient) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.client.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserRepository.toDTO(user);
  }

  async create(request: UserCreateRequest): Promise<User> {
    const user = await this.client.user.create({
      data: {
        name: request.name,
        email: request.email,
        password: request.password,
      },
    });

    return PrismaUserRepository.toDTO(user);
  }

  static toDTO(user: UserDocument): User {
    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
