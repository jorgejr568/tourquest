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

  describe("create", () => {
    it("should create a user", async () => {
      const mockClient = {
        user: {
          create: mock(async () => ({
            id: "mock-id",
            name: "mock-name",
            email: "mock-email",
            password: "mock-password",
            createdAt: new Date(),
            updatedAt: new Date(),
          })),
        },
      };

      const repository = new SUT(mockClient as any);

      const user = await repository.create({
        name: "mock-name",
        email: "mock-email",
        password: "mock-password",
      });

      expect(user.id).toEqual("mock-id");
      expect(user.name).toEqual("mock-name");
      expect(user.email).toEqual("mock-email");
      expect(user.password).toEqual("mock-password");

      expect(mockClient.user.create).toHaveBeenCalledTimes(1);
      expect(mockClient.user.create.mock.calls[0]).toEqual([
        {
          data: {
            name: "mock-name",
            email: "mock-email",
            password: "mock-password",
          },
        },
      ]);
    });

    it("should throw an error if the user could not be created", (done) => {
      const mockClient = {
        user: {
          create: mock(async () => {
            throw new Error("mock-error");
          }),
        },
      };

      const repository = new SUT(mockClient as any);

      repository
        .create({
          name: "mock-name",
          email: "mock-email",
          password: "mock-password",
        })
        .then(() => done("Expected an error to be thrown"))
        .catch((error) => {
          expect(error.message).toEqual("mock-error");
          done();
        });
    });
  });
});
