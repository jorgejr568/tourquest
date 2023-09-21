import { describe, it, expect, mock } from "bun:test";
import { DefaultCheckpointService } from "./checkpoint_service";
import {
  CheckpointNotFoundException,
  CheckpointNotReachedException,
} from "@/exceptions";
import { Checkpoint } from "@/dtos";

describe("services.checkpoint_service.DefaultCheckpointService", () => {
  describe("userListCheckpoints", () => {
    it("should return a list of checkpoints", async () => {
      const repository = {
        listByUserId: mock(async () => []),
      } as any;

      const service = new DefaultCheckpointService(repository, {} as any);
      const result = await service.userListCheckpoints("userId");

      expect(result).toEqual([]);
      expect(repository.listByUserId).toHaveBeenCalledTimes(1);
      expect(repository.listByUserId.mock.calls[0]).toEqual(["userId"]);
    });

    it("should throw an error if the repository throws an error", (done) => {
      const repository = {
        listByUserId: mock(async () => {
          throw new Error("error");
        }),
      } as any;

      const service = new DefaultCheckpointService(repository, {} as any);

      service
        .userListCheckpoints("userId")
        .then(() => done("should throw an error"))
        .catch((error) => {
          expect(error.message).toEqual("error");
          done();
        });
    });
  });

  describe("userMarkCheckpointAsCompleted", () => {
    it("should throw an error if the checkpoint is not found", (done) => {
      const repository = {
        findById: mock(async () => null),
      } as any;

      const service = new DefaultCheckpointService(repository, {} as any);

      service
        .userMarkCheckpointAsCompleted({
          userId: "userId",
          checkpointId: "checkpointId",
          latitude: 0,
          longitude: 0,
        })
        .then(() => done("should throw an error"))
        .catch((error) => {
          expect(error).toBeInstanceOf(CheckpointNotFoundException);

          expect(repository.findById).toHaveBeenCalledTimes(1);
          expect(repository.findById.mock.calls[0]).toEqual(["checkpointId"]);
          done();
        });
    });

    it("should throw an error if the distance is greater than the range", (done) => {
      const repository = {
        findById: mock(
          async () =>
            new Checkpoint({
              id: "checkpointId",
              title: "title",
              description: "description",
              image: "image",
              latitude: 1,
              longitude: 2,
              range: 50,
              rewards: [],
              completedAt: new Date(),
            })
        ),
      } as any;

      const geoDistance = {
        calculate: mock(() => 100),
      } as any;

      const service = new DefaultCheckpointService(repository, geoDistance);

      service
        .userMarkCheckpointAsCompleted({
          userId: "userId",
          checkpointId: "checkpointId",
          latitude: 3,
          longitude: 4,
        })
        .then(() => done("should throw an error"))
        .catch((error) => {
          expect(error).toBeInstanceOf(CheckpointNotReachedException);

          expect(repository.findById).toHaveBeenCalledTimes(1);
          expect(repository.findById.mock.calls[0]).toEqual(["checkpointId"]);
          expect(geoDistance.calculate).toHaveBeenCalledTimes(1);
          expect(geoDistance.calculate.mock.calls[0]).toEqual([
            { latitude: 3, longitude: 4 },
            { latitude: 1, longitude: 2 },
          ]);
          done();
        });
    });

    it("should throw an error if the repository throws an error", (done) => {
      const repository = {
        findById: mock(async () => {
          throw new Error("error");
        }),
      } as any;

      const service = new DefaultCheckpointService(repository, {} as any);

      service
        .userMarkCheckpointAsCompleted({
          userId: "userId",
          checkpointId: "checkpointId",
          latitude: 0,
          longitude: 0,
        })
        .then(() => done("should throw an error"))
        .catch((error) => {
          expect(error.message).toEqual("error");
          done();
        });
    });

    it("should throw an error if the geoDistance throws an error", (done) => {
      const repository = {
        findById: mock(
          async () =>
            new Checkpoint({
              id: "checkpointId",
              title: "title",
              description: "description",
              image: "image",
              latitude: 1,
              longitude: 2,
              range: 50,
              rewards: [],
              completedAt: new Date(),
            })
        ),
      } as any;

      const geoDistance = {
        calculate: mock(() => {
          throw new Error("error");
        }),
      } as any;

      const service = new DefaultCheckpointService(repository, geoDistance);

      service
        .userMarkCheckpointAsCompleted({
          userId: "userId",
          checkpointId: "checkpointId",
          latitude: 3,
          longitude: 4,
        })
        .then(() => done("should throw an error"))
        .catch((error) => {
          expect(error.message).toEqual("error");

          expect(repository.findById).toHaveBeenCalledTimes(1);
          expect(repository.findById.mock.calls[0]).toEqual(["checkpointId"]);
          expect(geoDistance.calculate).toHaveBeenCalledTimes(1);
          expect(geoDistance.calculate.mock.calls[0]).toEqual([
            { latitude: 3, longitude: 4 },
            { latitude: 1, longitude: 2 },
          ]);
          done();
        });
    });

    it("should mark a checkpoint as completed", async () => {
      const repository = {
        findById: mock(
          async () =>
            new Checkpoint({
              id: "checkpointId",
              title: "title",
              description: "description",
              image: "image",
              latitude: 1,
              longitude: 2,
              range: 50,
              rewards: [],
              completedAt: new Date(),
            })
        ),
        markAsDone: mock(async () => ({})),
      } as any;

      const geoDistance = {
        calculate: mock(() => 10),
      } as any;

      const service = new DefaultCheckpointService(repository, geoDistance);
      const result = await service.userMarkCheckpointAsCompleted({
        userId: "userId",
        checkpointId: "checkpointId",
        latitude: 0,
        longitude: 0,
      });

      expect(result).toEqual({});
      expect(repository.markAsDone).toHaveBeenCalledTimes(1);
      expect(repository.markAsDone.mock.calls[0]).toEqual([
        {
          userId: "userId",
          checkpointId: "checkpointId",
          latitude: 0,
          longitude: 0,
        },
      ]);
    });

    it("should throw an error if the repository throws an error", (done) => {
      const repository = {
        findById: mock(
          async () =>
            new Checkpoint({
              id: "checkpointId",
              title: "title",
              description: "description",
              image: "image",
              latitude: 1,
              longitude: 2,
              range: 50,
              rewards: [],
              completedAt: new Date(),
            })
        ),
        markAsDone: mock(async () => {
          throw new Error("error");
        }),
      } as any;

      const geoDistance = {
        calculate: mock(() => 10),
      } as any;

      const service = new DefaultCheckpointService(repository, geoDistance);

      service
        .userMarkCheckpointAsCompleted({
          userId: "userId",
          checkpointId: "checkpointId",
          latitude: 0,
          longitude: 0,
        })
        .then(() => done("should throw an error"))
        .catch((error) => {
          expect(error.message).toEqual("error");
          done();
        });
    });
  });
});
