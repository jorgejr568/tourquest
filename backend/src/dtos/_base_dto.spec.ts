import { describe, it, expect } from "bun:test";
import { BaseDTO } from "./_base_dto";

class MockDto extends BaseDTO<{ id: string }> {
  get id() {
    return this.data.id;
  }
}

describe("dtos._base", () => {
  describe("BaseDto", () => {
    describe("constructor", () => {
      it("should create a dto", () => {
        const dto = new MockDto({ id: "mock-id" });
        expect(dto.id).toEqual("mock-id");
      });
    });

    describe("toJSON", () => {
      it("should return the data", () => {
        const dto = new MockDto({ id: "mock-id" });
        expect(dto.toJSON()).toEqual({ id: "mock-id" });
      });
    });
  });
});
