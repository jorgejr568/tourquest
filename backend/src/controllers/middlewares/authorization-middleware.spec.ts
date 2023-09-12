import { describe, expect, it, mock } from "bun:test";
import { authorizationMiddleware } from "./authorization-middleware";
import { UnauthorizedException } from "@/exceptions";

describe("controllers.middlewares.authorization_middleware", () => {
  it("should be a function", () => {
    expect(authorizationMiddleware).toBeInstanceOf(Function);
  });

  it("should call next if the user is authenticated", () => {
    const mockRequest = {
      user: {
        id: "mock_id",
        email: "mock_email",
      },
    };
    const mockResponse = {};
    const mockNext = mock(() => {});

    authorizationMiddleware(mockRequest as any, mockResponse as any, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if the user is not authenticated", () => {
    const mockRequest = {
      user: null,
    };
    const mockResponse = {};
    const mockNext = mock(() => {});

    expect(() =>
      authorizationMiddleware(mockRequest as any, mockResponse as any, mockNext)
    ).toThrow(new UnauthorizedException());

    expect(mockNext).not.toHaveBeenCalled();
  });
});
