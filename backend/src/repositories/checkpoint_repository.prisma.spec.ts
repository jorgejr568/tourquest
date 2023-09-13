import { describe, it, expect, mock } from "bun:test";
import { PrismaCheckpointRepository } from "./checkpoint_repository.prisma";

describe("repositories.checkpoint_repository.PrismaCheckpointRepository", () => {
  describe("create", () => {
    it("should create a checkpoint", async () => {
      const mockClient = {
        checkpoint: {
          create: mock(async () => ({
            id: "mock-id",
            title: "mock-title",
            description: "mock-description",
            image: "mock-image",
            latitude: 22,
            longitude: 23,
          })),
        },
      };

      const repository = new PrismaCheckpointRepository(mockClient as any);

      const checkpoint = await repository.create({
        title: "mock-title",
        description: "mock-description",
        image: "mock-image",
        latitude: 22,
        longitude: 23,
      });

      expect(checkpoint.id).toEqual("mock-id");
      expect(checkpoint.title).toEqual("mock-title");
      expect(checkpoint.description).toEqual("mock-description");
      expect(checkpoint.image).toEqual("mock-image");
      expect(checkpoint.latitude).toEqual(22);
      expect(checkpoint.longitude).toEqual(23);

      expect(mockClient.checkpoint.create).toHaveBeenCalledTimes(1);
      expect(mockClient.checkpoint.create.mock.calls[0]).toEqual([
        {
          data: {
            title: "mock-title",
            description: "mock-description",
            image: "mock-image",
            latitude: 22,
            longitude: 23,
          },
        },
      ]);
    });

    it("should throw an error if the checkpoint could not be created", (done) => {
      const mockClient = {
        checkpoint: {
          create: mock(async () => {
            throw new Error("mock-error");
          }),
        },
      };

      const repository = new PrismaCheckpointRepository(mockClient as any);

      repository
        .create({
          title: "mock-title",
          description: "mock-description",
          image: "mock-image",
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

  describe("assignToJourney", () => {
    it("should assign a checkpoint to a journey", async () => {
      const mockClient = {
        journeyCheckpoint: {
          upsert: mock(async () => {}),
        },
      };

      const repository = new PrismaCheckpointRepository(mockClient as any);

      await repository.assignToJourney("mock-checkpoint-id", "mock-journey-id");

      expect(mockClient.journeyCheckpoint.upsert).toHaveBeenCalledTimes(1);
      expect(mockClient.journeyCheckpoint.upsert.mock.calls[0]).toEqual([
        {
          where: {
            journeyId_checkpointId: {
              checkpointId: "mock-checkpoint-id",
              journeyId: "mock-journey-id",
            },
          },
          create: {
            checkpointId: "mock-checkpoint-id",
            journeyId: "mock-journey-id",
          },
          update: {},
        },
      ]);
    });

    it("should throw an error if the checkpoint could not be assigned to the journey", (done) => {
      const mockClient = {
        journeyCheckpoint: {
          upsert: mock(async () => {
            throw new Error("mock-error");
          }),
        },
      };

      const repository = new PrismaCheckpointRepository(mockClient as any);

      repository
        .assignToJourney("mock-checkpoint-id", "mock-journey-id")
        .then(() => done("should have thrown an error"))
        .catch((error) => {
          expect(error.message).toEqual("mock-error");
          done();
        });
    });
  });

  describe("exists", () => {
    it("should return false if no checkpoint exists", (done) => {
      const mockClient = {
        checkpoint: {
          findFirst: mock(async () => undefined),
        },
      };

      const repository = new PrismaCheckpointRepository(mockClient as any);

      repository.exists("mock-id").then((result) => {
        expect(result).toEqual(false);
        done();
      });
    });

    it("should return the checkpoint id if a checkpoint exists", (done) => {
      const mockClient = {
        checkpoint: {
          findFirst: mock(async () => ({ id: "mock-id" })),
        },
      };

      const repository = new PrismaCheckpointRepository(mockClient as any);

      repository.exists("mock-id").then((result) => {
        expect(result).toEqual("mock-id");
        done();
      });
    });

    it("should throw an error if the findFirst throws", (done) => {
      const mockClient = {
        checkpoint: {
          findFirst: mock(async () => {
            throw new Error("mock-error");
          }),
        },
      };

      const repository = new PrismaCheckpointRepository(mockClient as any);

      repository
        .exists("mock-id")
        .then(() => done("should have thrown an error"))
        .catch((error) => {
          expect(error.message).toEqual("mock-error");
          done();
        });
    });
  });

  describe("listByJourneyId", () => {
    it("should return a list of checkpoints", async () => {
      const mockClient = {
        journeyCheckpoint: {
          findMany: mock(async () => [
            {
              Checkpoint: {
                id: "mock-id",
                title: "mock-title",
                description: "mock-description",
                image: "mock-image",
                latitude: 22,
                longitude: 23,
              },
            },
          ]),
        },
      };

      const repository = new PrismaCheckpointRepository(mockClient as any);

      const checkpoints = await repository.listByJourneyId("mock-journey-id");

      expect(checkpoints.length).toEqual(1);
      expect(checkpoints[0].id).toEqual("mock-id");
      expect(checkpoints[0].title).toEqual("mock-title");
      expect(checkpoints[0].description).toEqual("mock-description");
      expect(checkpoints[0].image).toEqual("mock-image");
      expect(checkpoints[0].latitude).toEqual(22);
      expect(checkpoints[0].longitude).toEqual(23);

      expect(mockClient.journeyCheckpoint.findMany).toHaveBeenCalledTimes(1);
      expect(mockClient.journeyCheckpoint.findMany.mock.calls[0]).toEqual([
        {
          where: { journeyId: "mock-journey-id" },
          include: { Checkpoint: true },
        },
      ]);
    });

    it("should throw an error if the checkpoints could not be listed", (done) => {
      const mockClient = {
        journeyCheckpoint: {
          findMany: mock(async () => {
            throw new Error("mock-error");
          }),
        },
      };

      const repository = new PrismaCheckpointRepository(mockClient as any);

      repository
        .listByJourneyId("mock-journey-id")
        .then(() => done("should have thrown an error"))
        .catch((error) => {
          expect(error.message).toEqual("mock-error");
          done();
        });
    });
  });

  describe("listByUserId", () => {
    it("should return a list of checkpoints", async () => {
      const mockClient = {
        userCompletedCheckpoints: {
          findMany: mock(async () => [
            {
              completedAt: new Date("2023-01-01T00:00:00.000Z"),
              Checkpoint: {
                id: "mock-id",
                title: "mock-title",
                description: "mock-description",
                image: "mock-image",
                latitude: 22,
                longitude: 23,
              },
            },
          ]),
        },
      };

      const repository = new PrismaCheckpointRepository(mockClient as any);

      const checkpoints = await repository.listByUserId("mock-user-id");

      expect(checkpoints.length).toEqual(1);
      expect(checkpoints[0].id).toEqual("mock-id");
      expect(checkpoints[0].title).toEqual("mock-title");
      expect(checkpoints[0].description).toEqual("mock-description");
      expect(checkpoints[0].image).toEqual("mock-image");
      expect(checkpoints[0].latitude).toEqual(22);
      expect(checkpoints[0].longitude).toEqual(23);
      expect(checkpoints[0].completedAt).toEqual(
        new Date("2023-01-01T00:00:00.000Z")
      );

      expect(
        mockClient.userCompletedCheckpoints.findMany
      ).toHaveBeenCalledTimes(1);
      expect(
        mockClient.userCompletedCheckpoints.findMany.mock.calls[0]
      ).toEqual([
        {
          where: { userId: "mock-user-id" },
          include: { Checkpoint: true },
        },
      ]);
    });

    it("should throw an error if the checkpoints could not be listed", (done) => {
      const mockClient = {
        userCompletedCheckpoints: {
          findMany: mock(async () => {
            throw new Error("mock-error");
          }),
        },
      };

      const repository = new PrismaCheckpointRepository(mockClient as any);

      repository
        .listByUserId("mock-user-id")
        .then(() => done("should have thrown an error"))
        .catch((error) => {
          expect(error.message).toEqual("mock-error");
          done();
        });
    });
  });
});
