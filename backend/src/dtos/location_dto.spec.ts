import { describe, it, expect } from "bun:test";
import { Location } from "./location_dto";
import { User } from "./user_dto";
import { Checkpoint } from "./checkpoint_dto";
import { Journey } from ".";

describe("dtos.location_dto", () => {
  describe("Location", () => {
    it("should create a location dto", () => {
      const dto = new Location({
        id: "mock-id",
        createdAt: new Date(),
        latitude: 22,
        longitude: 23,
        userId: "mock-user-id",
        checkpointId: "mock-checkpoint-id",
        journeyId: "mock-journey-id",
      });

      expect(dto.id).toEqual("mock-id");
      expect(dto.createdAt).toBeInstanceOf(Date);
      expect(dto.latitude).toEqual(22);
      expect(dto.longitude).toEqual(23);
      expect(dto.userId).toEqual("mock-user-id");
      expect(dto.checkpointId).toEqual("mock-checkpoint-id");
      expect(dto.journeyId).toEqual("mock-journey-id");

      expect(dto.toJSON()).toEqual({
        id: "mock-id",
        createdAt: dto.createdAt,
        latitude: 22,
        longitude: 23,
        userId: "mock-user-id",
        checkpointId: "mock-checkpoint-id",
        journeyId: "mock-journey-id",
      });
    });
  });
});
