import { LocationCreateRequest } from "@/dtos";
import { describe, it, expect, mock } from "bun:test";
import { PrismaLocationRepository } from "./location_repository.prisma";

describe("repositories.location_repository.PrismaLocationRepository", () => {
  describe("create", () => {
    const mockRequest: LocationCreateRequest = {
      latitude: 1,
      longitude: 2,
      journeyId: "mock-journey-id",
      checkpointId: "mock-checkpoint-id",
      userId: "mock-user-id",
    };

    it("should create a location", async () => {
      const mockClient = {
        location: {
          create: mock(async () => ({
            id: "mock-id",
            latitude: mockRequest.latitude,
            longitude: mockRequest.longitude,
            journeyId: mockRequest.journeyId,
            checkpointId: mockRequest.checkpointId,
            userId: mockRequest.userId,
          })),
        },
      };

      const repository = new PrismaLocationRepository(mockClient as any);

      const location = await repository.create(mockRequest);

      expect(location.id).toEqual("mock-id");
      expect(location.latitude).toEqual(mockRequest.latitude);
      expect(location.longitude).toEqual(mockRequest.longitude);
      expect(location.journeyId).toEqual(mockRequest.journeyId);
      expect(location.checkpointId).toEqual(mockRequest.checkpointId);
      expect(location.userId).toEqual(mockRequest.userId);

      expect(mockClient.location.create).toHaveBeenCalledTimes(1);
      expect(mockClient.location.create.mock.calls[0]).toEqual([
        {
          data: {
            latitude: mockRequest.latitude,
            longitude: mockRequest.longitude,
            journeyId: mockRequest.journeyId,
            checkpointId: mockRequest.checkpointId,
            userId: mockRequest.userId,
          },
        },
      ]);
    });

    it("should throw an error if the location could not be created", (done) => {
      const mockClient = {
        location: {
          create: mock(async () => {
            throw new Error("mock-error");
          }),
        },
      };

      const repository = new PrismaLocationRepository(mockClient as any);

      repository
        .create(mockRequest)
        .then(() => done("Expected an error to be thrown"))
        .catch((error) => {
          expect(error.message).toEqual("mock-error");
          done();
        });
    });
  });

  describe("toDTO", () => {
    it("should convert a location document to a location DTO", () => {
      const mockLocation = {
        id: "mock-id",
        latitude: 1,
        longitude: 2,
        createdAt: new Date(),
        journeyId: "mock-journey-id",
        checkpointId: "mock-checkpoint-id",
        userId: "mock-user-id",
      };

      const location = PrismaLocationRepository.toDTO(mockLocation as any);

      expect(location.id).toEqual(mockLocation.id);
      expect(location.latitude).toEqual(mockLocation.latitude);
      expect(location.longitude).toEqual(mockLocation.longitude);
      expect(location.journeyId).toEqual(mockLocation.journeyId);
      expect(location.checkpointId).toEqual(mockLocation.checkpointId);
      expect(location.userId).toEqual(mockLocation.userId);
    });

    it("should return journey and checkpoint undefined if it returns null", () => {
      const mockLocation = {
        id: "mock-id",
        latitude: 1,
        longitude: 2,
        createdAt: new Date(),
        journeyId: null,
        checkpointId: null,
        userId: "mock-user-id",
      };

      const location = PrismaLocationRepository.toDTO(mockLocation as any);

      expect(location.journeyId).toBeUndefined();
      expect(location.checkpointId).toBeUndefined();
    });
  });
});
