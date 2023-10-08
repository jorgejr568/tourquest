import { describe, expect, it } from "bun:test";
import { Reward } from "./reward_dto";

describe("dtos.reward_dto", () => {
  describe("reward", () => {
    it("should create a dto", () => {
      const dto = new Reward({
        id: "mock-id",
        title: "mock-title",
        description: "mock-description",
      });

      expect(dto.id).toEqual("mock-id");
      expect(dto.title).toEqual("mock-title");
      expect(dto.description).toEqual("mock-description");
    });
  });
});
