import { describe, it, mock, expect } from "bun:test";
import { DefaultLocationService } from "./location_service";
import { HttpException } from "@/exceptions";
import { Location } from "@/dtos";

describe("services.Location_service.DefaultLocationService", () => {
  describe("create", () => {
    it("should create locations", async () => {
      const mockLocationRepository = {
        create: mock(
          async () =>
            new Location({
              id: "mock-id",
              latitude: 22,
              longitude: 23,
              userId: "mock-user-id",
              journeyId: "mock-journey-id",
              checkpointId: "mock-checkpoint-id",
              createdAt: new Date(),
            })
        ),
      };

      const sut = new DefaultLocationService(mockLocationRepository as any);
      const location = await sut.create({
        userId: "mock-user-id",
        journeyId: "mock-journey-id",
        checkpointId: "mock-checkpoint-id",
        latitude: 22,
        longitude: 23,
      });

      expect(location).toBeInstanceOf(Location);
      expect(location.id).toEqual("mock-id");
      expect(location.latitude).toEqual(22);
      expect(location.longitude).toEqual(23);
      expect(location.userId).toEqual("mock-user-id");
      expect(location.journeyId).toEqual("mock-journey-id");
      expect(location.checkpointId).toEqual("mock-checkpoint-id");
      expect(location.createdAt).toBeInstanceOf(Date);

      expect(mockLocationRepository.create).toHaveBeenCalledTimes(1);
      expect(mockLocationRepository.create.mock.calls[0]).toEqual([
        {
          userId: "mock-user-id",
          journeyId: "mock-journey-id",
          checkpointId: "mock-checkpoint-id",
          latitude: 22,
          longitude: 23,
        },
      ]);
    });

    it("should throw an error if repository could not create the location", (done) => {
      const mockLocationRepository = {
        create: mock(async () => {
          throw new Error("mock-error");
        }),
      };

      const sut = new DefaultLocationService(mockLocationRepository as any);

      sut
        .create({
          userId: "mock-user-id",
          journeyId: "mock-journey-id",
          checkpointId: "mock-checkpoint-id",
          latitude: 22,
          longitude: 23,
        })
        .then(() => done("should have thrown an error"))
        .catch((error) => {
          expect(error.message).toEqual("mock-error");
          done();
        });
    });
  });
});
