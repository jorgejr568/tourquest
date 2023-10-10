import { describe, expect, it, mock } from "bun:test";
import { PrismaJourneyRepository } from "./journey_repository.prisma";
import { Journey, JourneyCreateRequest } from "@/dtos";

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
        shortDescription: "mock_short_description",
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
                shortDescription: "mock_short_description",
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
            shortDescription: "mock_short_description",
            image: "mock_image",
          })),
        },
      };
      const mockRequest: JourneyCreateRequest = {
        title: "mock_title",
        description: "mock_description",
        shortDescription: "mock_short_description",
        image: "mock_image",
      };

      const sut = new PrismaJourneyRepository(mockClient as any);

      sut
        .create(mockRequest)
        .then((journey) => {
          expect(journey).toBeDefined();
          expect(journey.id).toBe("mock_id");
          expect(journey.title).toBe("mock_title");
          expect(journey.description).toEqual(["mock_description"]);
          expect(journey.shortDescription).toBe("mock_short_description");
          expect(journey.image).toBe("mock_image");

          expect(mockClient.journey.create).toHaveBeenCalledTimes(1);
          expect(mockClient.journey.create.mock.calls[0]).toEqual([
            {
              data: {
                title: "mock_title",
                description: "mock_description",
                shortDescription: "mock_short_description",
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

  describe("exists", () => {
    it("should throw if prisma.journey.findFirst throws", (done) => {
      const mockClient = {
        journey: {
          findFirst: mock(async () => {
            throw new Error("mock_error");
          }),
        },
      };

      const sut = new PrismaJourneyRepository(mockClient as any);

      sut
        .exists("mock_title")
        .then(() => {
          done("should have thrown");
        })
        .catch((err) => {
          expect(err).toBeInstanceOf(Error);
          expect(err.message).toBe("mock_error");

          expect(mockClient.journey.findFirst).toHaveBeenCalledTimes(1);
          expect(mockClient.journey.findFirst.mock.calls[0]).toEqual([
            {
              where: {
                OR: [{ id: "mock_title" }, { title: "mock_title" }],
              },
            },
          ]);
        })
        .finally(done);
    });

    it("should return false if prisma.journey.findFirst returns null", (done) => {
      const mockClient = {
        journey: {
          findFirst: mock(async () => null),
        },
      };

      const sut = new PrismaJourneyRepository(mockClient as any);

      sut
        .exists("mock_title")
        .then((exists) => {
          expect(exists).toBe(false);

          expect(mockClient.journey.findFirst).toHaveBeenCalledTimes(1);
          expect(mockClient.journey.findFirst.mock.calls[0]).toEqual([
            {
              where: {
                OR: [{ id: "mock_title" }, { title: "mock_title" }],
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

  it("should return true if prisma.journey.findFirst returns a Journey", (done) => {
    const mockClient = {
      journey: {
        findFirst: mock(async () => ({
          id: "mock_id",
          title: "mock_title",
          description: "mock_description",
          image: "mock_image",
        })),
      },
    };

    const sut = new PrismaJourneyRepository(mockClient as any);

    sut
      .exists("mock_title")
      .then((exists) => {
        expect(exists).toBe(true);

        expect(mockClient.journey.findFirst).toHaveBeenCalledTimes(1);
        expect(mockClient.journey.findFirst.mock.calls[0]).toEqual([
          {
            where: {
              OR: [{ id: "mock_title" }, { title: "mock_title" }],
            },
          },
        ]);
      })
      .catch((err) => {
        done(err);
      })
      .finally(done);
  });

  describe("findByTitle", () => {
    it("should call findFirst with title", (done) => {
      const mockClient = {
        journey: {
          findFirst: mock(async () => ({
            id: "mock_id",
            title: "mock_title",
            description: "mock_description",
            image: "mock_image",
          })),
        },
      };

      const sut = new PrismaJourneyRepository(mockClient as any);
      sut
        .findByTitle("mock_title")
        .then((journey) => {
          expect(journey).toBeDefined();
          expect(journey).toBeTruthy();
          expect(journey).toBeInstanceOf(Journey);

          if (!journey) return;
          expect(journey.id).toBe("mock_id");
          expect(journey.title).toBe("mock_title");
          expect(journey.description).toEqual(["mock_description"]);
          expect(journey.image).toBe("mock_image");

          expect(mockClient.journey.findFirst).toHaveBeenCalledTimes(1);
          expect(mockClient.journey.findFirst.mock.calls[0]).toEqual([
            {
              where: {
                title: "mock_title",
              },
            },
          ]);
        })
        .catch((err) => {
          done(err);
        })
        .finally(done);
    });

    it("should return null if prisma.journey.findFirst returns null", (done) => {
      const mockClient = {
        journey: {
          findFirst: mock(async () => null),
        },
      };

      const sut = new PrismaJourneyRepository(mockClient as any);

      sut
        .findByTitle("mock_title")
        .then((journey) => {
          expect(journey).toBeNull();

          expect(mockClient.journey.findFirst).toHaveBeenCalledTimes(1);
          expect(mockClient.journey.findFirst.mock.calls[0]).toEqual([
            {
              where: {
                title: "mock_title",
              },
            },
          ]);
        })
        .catch((err) => {
          done(err);
        })
        .finally(done);
    });

    it("should throw if prisma.journey.findFirst throws", (done) => {
      const mockClient = {
        journey: {
          findFirst: mock(async () => {
            throw new Error("mock_error");
          }),
        },
      };

      const sut = new PrismaJourneyRepository(mockClient as any);

      sut
        .findByTitle("mock_title")
        .then(() => {
          done("should have thrown");
        })
        .catch((err) => {
          expect(err).toBeInstanceOf(Error);
          expect(err.message).toBe("mock_error");

          expect(mockClient.journey.findFirst).toHaveBeenCalledTimes(1);
          expect(mockClient.journey.findFirst.mock.calls[0]).toEqual([
            {
              where: {
                title: "mock_title",
              },
            },
          ]);
        })
        .finally(done);
    });
  });

  describe("list", () => {
    it("should call findMany", (done) => {
      const mockClient = {
        journey: {
          findMany: mock(async () => [
            {
              id: "mock_id",
              title: "mock_title",
              description: "mock_description",
              image: "mock_image",
              Checkpoints: [
                {
                  checkpointId: "mock_checkpoint_id",
                  journeyId: "mock_journey_id",
                  Checkpoint: {
                    id: "mock_checkpoint_id",
                    title: "mock_checkpoint_title",
                    description: "mock_checkpoint_description",
                    image: "mock_checkpoint_image",
                    range: 100,
                    latitude: 0,
                    longitude: 0,
                  },
                },
              ],
            },
          ]),
        },
      };

      const sut = new PrismaJourneyRepository(mockClient as any);

      sut
        .list()
        .then((journeys) => {
          expect(journeys).toBeDefined();
          expect(journeys).toBeTruthy();
          expect(journeys).toBeInstanceOf(Array);
          expect(journeys.length).toBe(1);

          const journey = journeys[0];
          expect(journey).toBeInstanceOf(Journey);

          expect(journey.id).toBe("mock_id");
          expect(journey.title).toBe("mock_title");
          expect(journey.description).toEqual(["mock_description"]);
          expect(journey.image).toBe("mock_image");
          expect(journey.checkpoints).toBeInstanceOf(Array);
          expect(journey.checkpoints.length).toBe(1);
          expect(journey.checkpoints[0].toJSON()).toEqual({
            id: "mock_checkpoint_id",
            title: "mock_checkpoint_title",
            description: "mock_checkpoint_description",
            image: "mock_checkpoint_image",
            range: 100,
            latitude: 0,
            longitude: 0,
          });

          expect(mockClient.journey.findMany).toHaveBeenCalledTimes(1);
        })
        .catch((err) => {
          done(err);
        })
        .finally(done);
    });

    it("should return an empty array if prisma.journey.findMany returns []", (done) => {
      const mockClient = {
        journey: {
          findMany: mock(async () => []),
        },
      };

      const sut = new PrismaJourneyRepository(mockClient as any);

      sut
        .list()
        .then((journeys) => {
          expect(journeys).toBeDefined();
          expect(journeys).toBeTruthy();
          expect(journeys).toBeInstanceOf(Array);
          expect(journeys.length).toBe(0);

          expect(mockClient.journey.findMany).toHaveBeenCalledTimes(1);
        })
        .catch((err) => {
          done(err);
        })
        .finally(done);
    });

    it("should throw if prisma.journey.findMany throws", (done) => {
      const mockClient = {
        journey: {
          findMany: mock(async () => {
            throw new Error("mock_error");
          }),
        },
      };

      const sut = new PrismaJourneyRepository(mockClient as any);

      sut
        .list()
        .then(() => {
          done("should have thrown");
        })
        .catch((err) => {
          expect(err).toBeInstanceOf(Error);
          expect(err.message).toBe("mock_error");

          expect(mockClient.journey.findMany).toHaveBeenCalledTimes(1);
        })
        .finally(done);
    });
  });
});
