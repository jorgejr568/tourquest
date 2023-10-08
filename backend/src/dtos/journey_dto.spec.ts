import { describe, expect, it } from "bun:test";
import { Journey } from "./journey_dto";

describe("dtos.journey_dto", () => {
  describe("Journey", () => {
    it("should create a journey dto", () => {
      const dto = new Journey({
        id: "mock-id",
        title: "mock-title",
        description: "mock-description\n\n\n\n   123    \n",
        shortDescription: "mock-short-description",
        image: "mock-image",
        rewards: [],
        checkpoints: [],
      });

      expect(dto.id).toEqual("mock-id");
      expect(dto.title).toEqual("mock-title");
      expect(dto.description).toEqual(["mock-description", "123"]);
      expect(dto.shortDescription).toEqual("mock-short-description");
      expect(dto.image).toEqual("mock-image");
      expect(dto.rewards).toEqual([]);
      expect(dto.checkpoints).toEqual([]);

      expect(dto.toJSON()).toEqual({
        id: "mock-id",
        title: "mock-title",
        description: ["mock-description", "123"],
        shortDescription: "mock-short-description",
        image: "mock-image",
        rewards: [],
        checkpoints: [],
      });
    });
  });
});
