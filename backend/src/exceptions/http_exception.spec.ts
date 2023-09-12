import { describe, it, expect, mock, spyOn } from "bun:test";
import {
  ExpressHttpExceptionErrorHandler,
  HttpException,
} from "./http_exception";
import { ZodError } from "zod";

class Sut extends HttpException {}

describe("exceptions.http_exception", () => {
  it("should be an instance of Error", () => {
    const sut = new Sut(400, "mock_message");
    expect(sut).toBeInstanceOf(Error);
  });

  it("should have a status and message", () => {
    const sut = new Sut(400, "mock_message");
    expect(sut.status).toBe(400);
    expect(sut.message).toBe("mock_message");
  });

  it("should have a toJSON method", () => {
    const sut = new Sut(400, "mock_message");
    expect(sut.toJSON()).toEqual({
      message: "mock_message",
      status: 400,
    });
  });

  it("should have a stack property", () => {
    const sut = new Sut(400, "mock_message");
    expect(sut.stack).toBeDefined();
  });
});

describe("exceptions.http_exception.ExpressHttpExceptionErrorHandler", () => {
  it("should be a function", () => {
    expect(ExpressHttpExceptionErrorHandler).toBeInstanceOf(Function);
  });

  it("should return a res with the error status and message", () => {
    const err = new Sut(400, "mock_message");
    const expressResponse = {
      status: () => expressResponse,
      json: () => expressResponse,
    };
    const spyStatus = spyOn(expressResponse, "status").mockImplementationOnce(
      () => expressResponse as any
    );
    const spyJson = spyOn(expressResponse, "json").mockImplementationOnce(
      () => expressResponse as any
    );

    const next = mock(() => {});

    ExpressHttpExceptionErrorHandler(
      err,
      {} as any,
      expressResponse as any,
      next
    );

    expect(spyStatus).toHaveBeenCalledTimes(1);
    const callParams = spyStatus.mock.calls[0] as any[];
    expect(callParams[0]).toBe(400);

    expect(spyJson).toHaveBeenCalledTimes(1);
    const callParamsJson = spyJson.mock.calls[0] as any[];
    expect(callParamsJson[0]).toEqual({
      message: "mock_message",
      status: 400,
      stack: err.stack?.split("\n").map((line) => line.trim()),
    });

    expect(next).toHaveBeenCalledTimes(0);
  });

  it("should return a res with the error status and message for ZodError", () => {
    const err = ZodError.create([
      {
        code: "invalid_type",
        expected: "string",
        received: "undefined",
        path: ["mock_path"],
        message: "mock_message",
      },
      {
        path: ["mock_path", "sub_path"],
        message: "mock_message",
        code: "invalid_type",
        expected: "string",
        received: "undefined",
      },
    ]);

    const expressResponse = {
      status: () => expressResponse,
      json: () => expressResponse,
    };
    const spyStatus = spyOn(expressResponse, "status").mockImplementationOnce(
      () => expressResponse as any
    );
    const spyJson = spyOn(expressResponse, "json").mockImplementationOnce(
      () => expressResponse as any
    );

    const next = mock(() => {});

    ExpressHttpExceptionErrorHandler(
      err as any,
      {} as any,
      expressResponse as any,
      next
    );

    expect(spyStatus).toHaveBeenCalledTimes(1);
    const callParams = spyStatus.mock.calls[0] as any[];
    expect(callParams[0]).toBe(422);

    expect(spyJson).toHaveBeenCalledTimes(1);
    const callParamsJson = spyJson.mock.calls[0] as any[];
    expect(callParamsJson[0]).toEqual({
      message: {
        mock_path: "mock_message",
        "mock_path.sub_path": "mock_message",
      },
      status: 422,
      stack: err.stack?.split("\n").map((line) => line.trim()),
    });

    expect(next).toHaveBeenCalledTimes(0);
  });

  it("should return a res with 500 status and message for other errors", () => {
    const err = new Error("mock_error");

    const expressResponse = {
      status: () => expressResponse,
      json: () => expressResponse,
    };

    const spyStatus = spyOn(expressResponse, "status").mockImplementationOnce(
      () => expressResponse as any
    );

    const spyJson = spyOn(expressResponse, "json").mockImplementationOnce(
      () => expressResponse as any
    );

    const next = mock(() => {});

    ExpressHttpExceptionErrorHandler(
      err as any,
      {} as any,
      expressResponse as any,
      next
    );

    expect(spyStatus).toHaveBeenCalledTimes(1);
    const callParams = spyStatus.mock.calls[0] as any[];
    expect(callParams[0]).toBe(500);

    expect(spyJson).toHaveBeenCalledTimes(1);
    const callParamsJson = spyJson.mock.calls[0] as any[];
    expect(callParamsJson[0]).toEqual({
      message: "Internal Server Error",
      status: 500,
      stack: err.stack?.split("\n").map((line) => line.trim()),
    });
  });
});
