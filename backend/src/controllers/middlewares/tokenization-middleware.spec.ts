import { describe, expect, it, mock } from "bun:test";
import { tokenizationMiddleware } from ".";
import { Tokenization } from "@/infra/tokenization";
import { any } from "zod";

describe("controllers.middlewares.TokenizationMiddleware", () => {
  it("should be a function", () => {
    expect(tokenizationMiddleware).toBeInstanceOf(Function);
  });

  it("should return a middleware", () => {
    const sut = tokenizationMiddleware();
    expect(sut).toBeInstanceOf(Function);
  });

  it("should be able to inject a tokenization service", () => {
    class MockTokenization implements Tokenization {
      sign = mock(() => "mock_token");
      verify = mock(() => ({
        id: "mock_id",
        name: "mock_name",
        email: "mock_email",
      }));
    }

    const mockTokenization = new MockTokenization();
    const sut = tokenizationMiddleware(mockTokenization);
    expect(sut).toBeInstanceOf(Function);

    const next = mock(() => {});

    const request = new (class {
      headers = {
        authorization: "Bearer mock_token",
      };

      private _user = any;

      get user() {
        return this._user;
      }

      set user(value: any) {
        this._user = value;
      }
    })();

    sut(request as any, {} as any, next);

    expect(request.user).toEqual({
      id: "mock_id",
      name: "mock_name",
      email: "mock_email",
    });
    expect(next).toHaveBeenCalledTimes(1);
    expect(mockTokenization.verify).toHaveBeenCalledTimes(1);

    const callParams = mockTokenization.verify.mock.calls[0] as any[];
    expect(callParams[0]).toBe("mock_token");
  });

  it("should not throw if the token is invalid", () => {
    class MockTokenization implements Tokenization {
      sign = mock(() => "mock_token");
      verify = mock(() => {
        throw new Error("mock_error");
      });
    }

    const mockTokenization = new MockTokenization();
    const sut = tokenizationMiddleware(mockTokenization);

    const next = mock(() => {});

    const request = new (class {
      headers = {
        authorization: "Bearer mock_token",
      };

      private _user = any;

      get user() {
        return this._user;
      }

      set user(value: any) {
        this._user = value;
      }
    })();

    expect(() => sut(request as any, {} as any, next)).not.toThrow();

    expect(request.user).toBeFalsy();
    expect(next).toHaveBeenCalledTimes(1);

    expect(mockTokenization.verify).toHaveBeenCalledTimes(1);
    const callParams = mockTokenization.verify.mock.calls[0] as any[];
    expect(callParams[0]).toBe("mock_token");
  });
});
