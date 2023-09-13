import { User, UserCreateRequest } from "@/dtos";
import { UserRepository } from "@/repositories";
import { beforeEach, describe, expect, it, mock } from "bun:test";
import { DefaultUserService } from "./user_service";
import { CredentialsNotMatchException } from "@/exceptions";

describe("services.UserService.signIn", () => {
  it("should throw an error if the user is not found", (done) => {
    const mockRepository = {
      findUserByEmail: mock(async () => null),
    } as any;
    const sut = new DefaultUserService(mockRepository, {} as any, {} as any);
    const request = {
      email: "mock_email",
      password: "mock_password",
    };

    sut
      .signIn(request)
      .then(() => {
        done("this should throw an exception");
      })
      .catch((err) => {
        expect(err).toBeInstanceOf(CredentialsNotMatchException);
        expect(mockRepository.findUserByEmail).toHaveBeenCalledTimes(1);
        expect(mockRepository.findUserByEmail.mock.calls[0]).toEqual([
          request.email,
        ]);
        done();
      });
  });

  it("should throw an error if the password does not match", (done) => {
    const request = {
      email: "mock_email",
      password: "mock_password",
    };

    const mockRepository = {
      findUserByEmail: mock(() =>
        Promise.resolve(
          new User({
            id: "mock_id",
            name: "mock_name",
            email: "mock_email",
            password: Bun.password.hashSync("wrong_password"),
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        )
      ),
    } as any;

    const sut = new DefaultUserService(mockRepository, {} as any, {} as any);

    sut
      .signIn(request)
      .then(() => {
        done("this should throw an exception");
      })
      .catch((err) => {
        expect(err).toBeInstanceOf(CredentialsNotMatchException);
        expect(mockRepository.findUserByEmail).toHaveBeenCalledTimes(1);
        expect(mockRepository.findUserByEmail.mock.calls[0]).toEqual([
          request.email,
        ]);
        done();
      });
  });

  it("should throw if the token throws", (done) => {
    const tokenizationMock = {
      sign: mock(() => {
        throw new Error("mock_error");
      }),
    } as any;

    const mockRepository = {
      findUserByEmail: mock(
        async () =>
          new User({
            id: "mock_id",
            name: "mock_name",
            email: "mock_email",
            password: Bun.password.hashSync("mock_password"),
            createdAt: new Date(),
            updatedAt: new Date(),
          })
      ),
    } as any;

    const sut = new DefaultUserService(
      mockRepository,
      tokenizationMock,
      {} as any
    );
    const request = {
      email: "mock_email",
      password: "mock_password",
    };

    sut
      .signIn(request)
      .then(() => {
        done("this should throw an exception");
      })
      .catch((err) => {
        expect(err).toBeInstanceOf(Error);
        expect(mockRepository.findUserByEmail).toHaveBeenCalledTimes(1);
        expect(mockRepository.findUserByEmail.mock.calls[0]).toEqual([
          request.email,
        ]);
        expect(tokenizationMock.sign).toHaveBeenCalledTimes(1);
        expect(tokenizationMock.sign.mock.calls[0]).toEqual([
          {
            id: "mock_id",
            email: "mock_email",
          },
        ]);
        done();
      });
  });

  it("should return the user and token", async () => {
    const tokenizationMock = {
      sign: mock(() => {
        return "mock_token";
      }),
    } as any;

    const mockUser = {
      id: "mock_id",
      name: "mock_name",
      email: "mock_email",
      password: Bun.password.hashSync("mock_password"),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockRepository = {
      findUserByEmail: mock(async () => new User(mockUser)),
    } as any;

    const sut = new DefaultUserService(
      mockRepository,
      tokenizationMock,
      {} as any
    );

    const request = {
      email: "mock_email",
      password: "mock_password",
    };

    const response = await sut.signIn(request);
    expect(response.token).toEqual("mock_token");
    expect(response.user.toJSON()).toEqual({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      createdAt: mockUser.createdAt,
      updatedAt: mockUser.updatedAt,
    });

    expect(mockRepository.findUserByEmail).toHaveBeenCalledTimes(1);
    expect(mockRepository.findUserByEmail.mock.calls[0]).toEqual([
      request.email,
    ]);
    expect(tokenizationMock.sign).toHaveBeenCalledTimes(1);
    expect(tokenizationMock.sign.mock.calls[0]).toEqual([
      {
        id: mockUser.id,
        email: mockUser.email,
      },
    ]);
  });

  describe("listCheckpoints", () => {
    it("should list checkpoints for a user", async () => {
      const mockCheckpointRepository = {
        listByUserId: mock(async () => [{ id: "mock-id" }]),
      };

      const sut = new DefaultUserService(
        null as any,
        {} as any,
        mockCheckpointRepository as any
      );

      const checkpoints = await sut.listCheckpoints("mock-user-id");

      expect(checkpoints).toEqual([{ id: "mock-id" }]);
      expect(mockCheckpointRepository.listByUserId).toHaveBeenCalledTimes(1);
      expect(mockCheckpointRepository.listByUserId.mock.calls[0]).toEqual([
        "mock-user-id",
      ]);
    });

    it("should throw an error if repository throws", (done) => {
      const mockCheckpointRepository = {
        listByUserId: mock(async () => {
          throw new Error("mock-error");
        }),
      };

      const sut = new DefaultUserService(
        null as any,
        {} as any,
        mockCheckpointRepository as any
      );

      sut
        .listCheckpoints("mock-user-id")
        .then(() => {
          done("this should throw an exception");
        })
        .catch((err) => {
          expect(err).toBeInstanceOf(Error);
          expect(mockCheckpointRepository.listByUserId).toHaveBeenCalledTimes(
            1
          );
          expect(mockCheckpointRepository.listByUserId.mock.calls[0]).toEqual([
            "mock-user-id",
          ]);
          done();
        });
    });
  });
});
