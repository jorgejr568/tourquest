import { beforeEach, describe, expect, it, spyOn } from "bun:test";
import { JwtTokenization } from "./jwt";
import jwt from "jsonwebtoken";
import { Environment } from "@/constants";
import { InvalidTokenException } from "@/exceptions";

describe("infra.tokenization.jwt", () => {
  const originalSign = jwt.sign;
  const originalVerify = jwt.verify;
  const signSpy = spyOn(jwt, "sign");
  const verifySpy = spyOn(jwt, "verify");

  beforeEach(() => {
    signSpy.mockReset();
    verifySpy.mockReset();
  });

  it("should be an instance of Tokenization", () => {
    const sut = new JwtTokenization();
    expect(sut.sign).toBeInstanceOf(Function);
    expect(sut.verify).toBeInstanceOf(Function);
  });

  it("should be able pass a secret and expiresIn", () => {
    const sut = new JwtTokenization("mock_secret", "mock_expiresIn");
    expect(sut).toBeInstanceOf(JwtTokenization);

    signSpy.mockReturnValueOnce("mock_token" as any);

    const result = sut.sign({
      id: "mock_id",
      name: "mock_name",
      email: "mock_email",
    });
    expect(signSpy).toHaveBeenCalledTimes(1);
    expect(result).toBe("mock_token");

    const callParams = signSpy.mock.calls[0] as any[];
    expect(callParams[0]).toEqual({
      id: "mock_id",
      name: "mock_name",
      email: "mock_email",
    });
    expect(callParams[1]).toBe("mock_secret");
    expect(callParams[2]).toEqual({
      expiresIn: "mock_expiresIn",
      algorithm: "HS256",
      subject: "mock_id",
      issuer: "TourQuest",
    });

    signSpy.mockReset();
  });

  it("should use the environment variables as default", () => {
    const sut = new JwtTokenization();
    expect(sut).toBeInstanceOf(JwtTokenization);

    signSpy.mockReturnValueOnce("mock_token" as any);

    const result = sut.sign({
      id: "mock_id",
      name: "mock_name",
      email: "mock_email",
    });
    expect(signSpy).toHaveBeenCalledTimes(1);
    expect(result).toBe("mock_token");

    const callParams = signSpy.mock.calls[0] as any[];

    expect(callParams[0]).toEqual({
      id: "mock_id",
      name: "mock_name",
      email: "mock_email",
    });
    expect(callParams[1]).toBe(Environment.JWT_SECRET);
    expect(callParams[2]).toEqual({
      expiresIn: Environment.JWT_EXPIRES_IN,
      algorithm: "HS256",
      subject: "mock_id",
      issuer: "TourQuest",
    });
  });

  it("should be able to verify a generated token", () => {
    const sut = new JwtTokenization();
    expect(sut).toBeInstanceOf(JwtTokenization);

    signSpy.mockImplementationOnce(originalSign as any);
    const token = sut.sign({
      id: "mock_id",
      name: "mock_name",
      email: "mock_email",
    });
    expect(signSpy).toHaveBeenCalledTimes(1);
    expect(token).toBeString();

    verifySpy.mockImplementationOnce(originalVerify as any);
    const result = sut.verify(token);
    expect(verifySpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      id: "mock_id",
      name: "mock_name",
      email: "mock_email",
    });

    const callParams = verifySpy.mock.calls[0] as any[];

    expect(callParams[0]).toBe(token);
    expect(callParams[1]).toBe(Environment.JWT_SECRET);
    expect(callParams[2]).toEqual({
      algorithms: ["HS256"],
      issuer: "TourQuest",
    });
  });

  it("a token generated with a different secret should throw an InvalidTokenException", () => {
    const sut1 = new JwtTokenization("secret1");
    const sut2 = new JwtTokenization("secret2");

    signSpy.mockImplementationOnce(originalSign as any);
    verifySpy.mockImplementationOnce(originalVerify as any);

    const token = sut1.sign({
      id: "mock_id",
      name: "mock_name",
      email: "mock_email",
    });
    expect(signSpy).toHaveBeenCalledTimes(1);
    expect(token).toBeString();

    expect(() => sut2.verify(token)).toThrow(new InvalidTokenException());
  });

  it("a token generated with the same secret in different instances should be valid", () => {
    const sut1 = new JwtTokenization("secret1");
    const sut2 = new JwtTokenization("secret1");

    signSpy.mockImplementationOnce(originalSign as any);
    verifySpy.mockImplementationOnce(originalVerify as any);

    const token = sut1.sign({
      id: "mock_id",
      name: "mock_name",
      email: "mock_email",
    });
    expect(signSpy).toHaveBeenCalledTimes(1);
    expect(token).toBeString();

    expect(sut2.verify(token)).toEqual({
      id: "mock_id",
      name: "mock_name",
      email: "mock_email",
    });
  });

  it("a token should expire", () => {
    const sut = new JwtTokenization(Environment.JWT_SECRET, "1h");

    signSpy.mockImplementationOnce(originalSign as any);
    verifySpy.mockImplementationOnce(originalVerify as any);

    const token = sut.sign({
      id: "mock_id",
      name: "mock_name",
      email: "mock_email",
    });
    expect(signSpy).toHaveBeenCalledTimes(1);
    expect(token).toBeString();
    expect(() => sut.verify(token)).not.toThrow(new InvalidTokenException());
    expect(verifySpy).toHaveBeenCalledTimes(1);
    verifySpy.mockReset();

    const oneHourAndOneMinuteInMilliseconds = 1 * 60 * 60 * 1000 + 60 * 1000;
    spyOn(Date, "now").mockImplementationOnce(
      () => (Date.now() + oneHourAndOneMinuteInMilliseconds) as any,
    );

    verifySpy.mockImplementationOnce(originalVerify as any);
    expect(() => sut.verify(token)).toThrow(new InvalidTokenException());
    expect(verifySpy).toHaveBeenCalledTimes(1);
  });
});
