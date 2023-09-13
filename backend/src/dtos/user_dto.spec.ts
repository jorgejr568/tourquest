import { describe, expect, it } from "bun:test";
import { User } from "./user_dto";

describe("dtos.User", () => {
  it("should instance a new user with all properties", () => {
    const user = new User({
      id: "1",
      email: "example@example.org",
      password: "password",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(user).not.toBeNull();
    expect(user.id).toEqual("1");
    expect(user.email).toEqual("example@example.org");
    expect(user.password).toEqual("password");
    expect(user.createdAt).not.toBeNull();
    expect(user.updatedAt).not.toBeNull();
  });

  it("toJSON should return the user without password", () => {
    const user = new User({
      id: "1",
      email: "mock_email",
      password: "mock_password",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(user.toJSON()).toEqual({
      id: "1",
      email: "mock_email",
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  });
});
