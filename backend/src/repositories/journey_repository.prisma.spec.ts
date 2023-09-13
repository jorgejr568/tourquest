import { describe, expect, it, mock } from "bun:test";
import { PrismaJourneyRepository } from "./journey_repository.prisma";
import { JourneyCreateRequest } from "@/dtos";

describe("repositories.journey_repository.PrismJourneyRepository", () => {
  describe("create", () => {
    it("should throw if prisma.journey.create throws", (done) => {
      const mockClient = {
        journey: {
          create: mock(() => {
            throw new Error("mock_error");
          }),
        },
      };
      const mockRequest: JourneyCreateRequest = {
        title: "mock_title",
        description: "mock_description",
        image: "mock_image",
      };

      const sut = new PrismaJourneyRepository(mockClient as any);

      sut
        .create(mockRequest)
        .then(() => {
          done("should have thrown");
        })
        .catch((err) => {
          expect(err).toBeInstanceOf(Error);
          expect(err.message).toBe("mock_error");

          expect(mockClient.journey.create).toHaveBeenCalledTimes(1);
          expect(mockClient.journey.create.mock.calls[0]).toEqual([
            {
              data: {
                title: "mock_title",
                description: "mock_description",
                image: "mock_image",
              },
            },
          ]);
        })
        .finally(done);
    });

    it("should return a Journey", (done) => {
      const mockClient = {
        journey: {
          create: mock(() => ({
            id: "mock_id",
            title: "mock_title",
            description: "mock_description",
            image: "mock_image",
          })),
        },
      };
      const mockRequest: JourneyCreateRequest = {
        title: "mock_title",
        description: "mock_description",
        image: "mock_image",
      };

      const sut = new PrismaJourneyRepository(mockClient as any);

      sut
        .create(mockRequest)
        .then((journey) => {
          expect(journey).toBeDefined();
          expect(journey.id).toBe("mock_id");
          expect(journey.name).toBe("mock_title");
          expect(journey.description).toBe("mock_description");
          expect(journey.image).toBe("mock_image");

          expect(mockClient.journey.create).toHaveBeenCalledTimes(1);
          expect(mockClient.journey.create.mock.calls[0]).toEqual([
            {
              data: {
                title: "mock_title",
                description: "mock_description",
                image: "mock_image",
              },
            },
          ]);
        })
        .catch((err) => {
          done(err);
        })
        .finally(done);
    });
  });
});
