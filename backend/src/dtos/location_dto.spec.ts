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
        user: new User({
          id: "mock-id",
          name: "mock-name",
          email: "mock-email",
          password: "mock-password",
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
        checkpoint: new Checkpoint({
          id: "mock-id",
          title: "mock-title",
          description: "mock-description",
          image: "mock-image",
          latitude: 22,
          longitude: 23,
        }),
        journey: new Journey({
          id: "mock-id",
          title: "mock-title",
          description: "mock-description",
          image: "mock-image",
        }),
      });

      expect(dto.id).toEqual("mock-id");
      expect(dto.createdAt).toBeInstanceOf(Date);
      expect(dto.latitude).toEqual(22);
      expect(dto.longitude).toEqual(23);
      expect(dto.user).toBeInstanceOf(User);
      expect(dto.checkpoint).toBeInstanceOf(Checkpoint);
      expect(dto.journey).toBeInstanceOf(Journey);

      expect(dto.toJSON()).toEqual({
        id: "mock-id",
        createdAt: dto.createdAt,
        latitude: 22,
        longitude: 23,
        user: dto.user.toJSON(),
        checkpoint: dto.checkpoint?.toJSON(),
        journey: dto.journey?.toJSON(),
      });
    });
  });
});
