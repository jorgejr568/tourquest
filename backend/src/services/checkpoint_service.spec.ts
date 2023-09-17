import { describe, it, expect, mock } from "bun:test";
import { DefaultCheckpointService } from "./checkpoint_service";

describe("services.checkpoint_service.DefaultCheckpointService", () => {
  describe("userListCheckpoints", () => {
    it("should return a list of checkpoints", async () => {
      const repository = {
        listByUserId: mock(async () => []),
      } as any;

      const service = new DefaultCheckpointService(repository);
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

      const service = new DefaultCheckpointService(repository);

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
    it("should mark a checkpoint as completed", async () => {
      const repository = {
        markAsDone: mock(async () => ({})),
      } as any;

      const service = new DefaultCheckpointService(repository);
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
        markAsDone: mock(async () => {
          throw new Error("error");
        }),
      } as any;

      const service = new DefaultCheckpointService(repository);

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
