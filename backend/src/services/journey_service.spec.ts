import { describe, it, mock, expect } from "bun:test";
import { DefaultJourneyService } from "./journey_service";
import { HttpException, JourneyNotFoundException } from "@/exceptions";

describe("services.journery_service.DefaultJourneyService", () => {
  describe("listJourneys", () => {
    it("should list journeys", async () => {
      const mockJourneyRepository = {
        list: mock(async () => [{ id: "mock-id" }]),
      };

      const sut = new DefaultJourneyService(
        mockJourneyRepository as any,
        null as any
      );
      const journeys = await sut.listJourneys();

      expect(journeys).toEqual([{ id: "mock-id" }]);
    });

    it("should throw an error if the journey could not be listed", (done) => {
      const mockJourneyRepository = {
        list: mock(async () => {
          throw new Error("mock-error");
        }),
      };

      const sut = new DefaultJourneyService(
        mockJourneyRepository as any,
        null as any
      );

      sut
        .listJourneys()
        .then(() => done("Expected an error to be thrown"))
        .catch((error) => {
          expect(error.message).toEqual("mock-error");
          done();
        });
    });
  });

  describe("listJourneyCheckpoints", () => {
    it("should list checkpoints for a journey", async () => {
      const mockJourneyRepository = {
        exists: mock(async () => true),
      };
      const mockCheckpointRepository = {
        listByJourneyId: mock(async () => [{ id: "mock-id" }]),
      };

      const sut = new DefaultJourneyService(
        mockJourneyRepository as any,
        mockCheckpointRepository as any
      );

      const checkpoints = await sut.listJourneyCheckpoints("mock-journey-id");

      expect(checkpoints).toEqual([{ id: "mock-id" }]);
      expect(mockJourneyRepository.exists).toHaveBeenCalledTimes(1);
      expect(mockJourneyRepository.exists.mock.calls[0]).toEqual([
        "mock-journey-id",
      ]);
      expect(mockCheckpointRepository.listByJourneyId).toHaveBeenCalledTimes(1);
      expect(mockCheckpointRepository.listByJourneyId.mock.calls[0]).toEqual([
        "mock-journey-id",
      ]);
    });

    it("should throw an error if the journey does not exist", (done) => {
      const mockJourneyRepository = {
        exists: mock(async () => false),
      };

      const sut = new DefaultJourneyService(
        mockJourneyRepository as any,
        null as any
      );

      sut
        .listJourneyCheckpoints("mock-journey-id")
        .then(() => done("Expected an error to be thrown"))
        .catch((error) => {
          expect(error).toBeInstanceOf(HttpException);
          expect(error).toBeInstanceOf(JourneyNotFoundException);
          expect(mockJourneyRepository.exists).toHaveBeenCalledTimes(1);
          expect(mockJourneyRepository.exists.mock.calls[0]).toEqual([
            "mock-journey-id",
          ]);
          done();
        });
    });

    it("should throw an error if the exists method throws an error", (done) => {
      const mockJourneyRepository = {
        exists: mock(async () => {
          throw new Error("mock-error");
        }),
      };

      const sut = new DefaultJourneyService(
        mockJourneyRepository as any,
        null as any
      );

      sut
        .listJourneyCheckpoints("mock-journey-id")
        .then(() => done("Expected an error to be thrown"))
        .catch((error) => {
          expect(error.message).toEqual("mock-error");
          expect(mockJourneyRepository.exists).toHaveBeenCalledTimes(1);
          expect(mockJourneyRepository.exists.mock.calls[0]).toEqual([
            "mock-journey-id",
          ]);
          done();
        });
    });

    it("should throw an error if the checkpoints could not be listed", (done) => {
      const mockJourneyRepository = {
        exists: mock(async () => true),
      };

      const mockCheckpointRepository = {
        listByJourneyId: mock(async () => {
          throw new Error("mock-error");
        }),
      };

      const sut = new DefaultJourneyService(
        mockJourneyRepository as any,
        mockCheckpointRepository as any
      );

      sut
        .listJourneyCheckpoints("mock-journey-id")
        .then(() => done("Expected an error to be thrown"))
        .catch((error) => {
          expect(error.message).toEqual("mock-error");
          expect(mockJourneyRepository.exists).toHaveBeenCalledTimes(1);
          expect(mockJourneyRepository.exists.mock.calls[0]).toEqual([
            "mock-journey-id",
          ]);
          expect(
            mockCheckpointRepository.listByJourneyId
          ).toHaveBeenCalledTimes(1);
          expect(
            mockCheckpointRepository.listByJourneyId.mock.calls[0]
          ).toEqual(["mock-journey-id"]);
          done();
        });
    });
  });
});
