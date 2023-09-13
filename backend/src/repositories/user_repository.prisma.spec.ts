import { describe, it, mock, expect, spyOn } from "bun:test";

import { PrismaUserRepository as SUT } from "./user_repository.prisma";
import { User } from "@/dtos";

const mockEmail = "example@example.org";

describe("repositories.PrismaUserRepository", () => {
  it("finds a user by email", async () => {
    const prismaUser = {
      id: "1",
      email: mockEmail,
      password: "password",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockFindUnique = mock(() => prismaUser);

    const mockPrismaClient = {
      user: {
        findUnique: mockFindUnique,
      },
    };

    const sut = new SUT(mockPrismaClient as any);
    const user = await sut.findUserByEmail(mockEmail);

    expect(user).not.toBeNull();
    expect(user?.id).toEqual(prismaUser.id);
    expect(user?.email).toEqual(prismaUser.email);
    expect(user?.password).toEqual(prismaUser.password);
    expect(user?.createdAt).toEqual(prismaUser.createdAt);
    expect(user?.updatedAt).toEqual(prismaUser.updatedAt);
    expect(user instanceof User).toBeTruthy();

    expect(mockFindUnique).toHaveBeenCalledTimes(1);
    expect(mockFindUnique.mock.calls[0]).toEqual([
      {
        where: {
          email: mockEmail,
        },
      },
    ]);
  });

  it("returns null if no user is found", async () => {
    const mockFindUnique = mock(() => null);

    const mockPrismaClient = {
      user: {
        findUnique: mockFindUnique,
      },
    };

    const sut = new SUT(mockPrismaClient as any);
    const user = await sut.findUserByEmail(mockEmail);

    expect(user).toBeNull();
    expect(mockFindUnique).toHaveBeenCalledTimes(1);
    expect(mockFindUnique.mock.calls[0]).toEqual([
      {
        where: {
          email: mockEmail,
        },
      },
    ]);
  });
});
