import { User } from "@/dtos";
import { UserRepository } from "@/repositories";
import { beforeEach, describe, expect, it, mock, spyOn } from "bun:test";
import { DefaultUserService } from "./user_service";
import { CredentialsNotMatchException } from "@/exceptions";

class MockRepository implements UserRepository {
  findUserByEmail = (email: string): Promise<User | null> =>
    Promise.resolve(null);
}

const mockRepository = new MockRepository();

describe("services.UserService.signIn", () => {
  const spyFindUserByEmail = spyOn(mockRepository, "findUserByEmail");

  beforeEach(() => {
    spyFindUserByEmail.mockClear();
  });

  it("should throw an error if the user is not found", (done) => {
    const sut = new DefaultUserService(mockRepository, {} as any);
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
        expect(spyFindUserByEmail).toHaveBeenCalledTimes(1);
        expect(spyFindUserByEmail.mock.calls[0]).toEqual([request.email]);
        done();
      });
  });

  it("should throw an error if the password does not match", (done) => {
    const sut = new DefaultUserService(mockRepository, {} as any);
    const request = {
      email: "mock_email",
      password: "mock_password",
    };

    spyFindUserByEmail.mockImplementationOnce(
      () =>
        Promise.resolve(
          new User({
            id: "mock_id",
            email: "mock_email",
            password: Bun.password.hashSync("wrong_password"),
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        ) as any
    );

    sut
      .signIn(request)
      .then(() => {
        done("this should throw an exception");
      })
      .catch((err) => {
        expect(err).toBeInstanceOf(CredentialsNotMatchException);
        expect(spyFindUserByEmail).toHaveBeenCalledTimes(1);
        expect(spyFindUserByEmail.mock.calls[0]).toEqual([request.email]);
        done();
      });
  });

  it("should throw if the token throws", (done) => {
    const signMock = mock(() => {
      throw new Error("mock_error");
    });
    const sut = new DefaultUserService(mockRepository, {
      sign: signMock,
    } as any);
    const request = {
      email: "mock_email",
      password: "mock_password",
    };

    spyFindUserByEmail.mockImplementationOnce(
      () =>
        Promise.resolve(
          new User({
            id: "mock_id",
            email: "mock_email",
            password: Bun.password.hashSync("mock_password"),
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        ) as any
    );

    sut
      .signIn(request)
      .then(() => {
        done("this should throw an exception");
      })
      .catch((err) => {
        expect(err).toBeInstanceOf(Error);
        expect(spyFindUserByEmail).toHaveBeenCalledTimes(1);
        expect(spyFindUserByEmail.mock.calls[0]).toEqual([request.email]);
        expect(signMock).toHaveBeenCalledTimes(1);
        expect(signMock.mock.calls[0]).toEqual([
          {
            id: "mock_id",
            email: "mock_email",
          },
        ]);
        done();
      });
  });

  it("should return the user and token", async () => {
    const signMock = mock(() => {
      return "mock_token";
    });

    const sut = new DefaultUserService(mockRepository, {
      sign: signMock,
    } as any);

    const request = {
      email: "mock_email",
      password: "mock_password",
    };

    const mockUser = {
      id: "mock_id",
      email: "mock_email",
      password: Bun.password.hashSync("mock_password"),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    spyFindUserByEmail.mockImplementationOnce(
      () => Promise.resolve(new User(mockUser)) as any
    );

    const response = await sut.signIn(request);
    expect(response.token).toEqual("mock_token");
    expect(response.user.toJSON()).toEqual({
      id: mockUser.id,
      email: mockUser.email,
      createdAt: mockUser.createdAt,
      updatedAt: mockUser.updatedAt,
    });

    expect(spyFindUserByEmail).toHaveBeenCalledTimes(1);
    expect(spyFindUserByEmail.mock.calls[0]).toEqual([request.email]);
    expect(signMock).toHaveBeenCalledTimes(1);
    expect(signMock.mock.calls[0]).toEqual([
      {
        id: mockUser.id,
        email: mockUser.email,
      },
    ]);
  });
});
