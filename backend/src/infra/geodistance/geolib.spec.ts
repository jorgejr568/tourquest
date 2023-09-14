import { describe, expect, it, mock } from "bun:test";
import { GeoLocation } from "./_interface";
import { GeolibDistance } from "./geolib";
import geolib from "geolib";
describe("infra.geodistance.geolib", () => {
  describe("calculate", () => {
    it("should calculate the distance between two coordinates", async () => {
      const coords: {
        from: GeoLocation;
        to: GeoLocation;
        distanceRange: [number, number];
      }[] = [
        {
          from: {
            latitude: 40.748817,
            longitude: -73.985428,
          },
          to: {
            latitude: 40.712775,
            longitude: -74.005972,
          },
          distanceRange: [4300, 4500],
        },
        {
          from: {
            latitude: 48.858844,
            longitude: 2.294351,
          },
          to: {
            latitude: 48.860611,
            longitude: 2.337644,
          },
          distanceRange: [3000, 3400],
        },
        {
          from: {
            latitude: 34.052235,
            longitude: -118.243683,
          },
          to: {
            latitude: 34.052235,
            longitude: -118.243683,
          },
          distanceRange: [0, 0],
        },
        {
          from: {
            latitude: 51.503364,
            longitude: -0.119543,
          },
          to: {
            latitude: 51.507468,
            longitude: -0.122894,
          },
          distanceRange: [500, 600],
        },
      ];

      const distance = new GeolibDistance();

      for (const { from, to, distanceRange } of coords) {
        const distanceBetween = distance.calculate(from, to);
        expect(distanceBetween).toBeGreaterThanOrEqual(distanceRange[0]);
        expect(distanceBetween).toBeLessThanOrEqual(distanceRange[1]);
      }
    });

    it("should throw an error if the distance could not be calculated", async () => {
      const getDistanceMock = mock(() => {
        throw new Error("mock-error");
      });

      const distance = new GeolibDistance(getDistanceMock as any);

      expect(() =>
        distance.calculate(
          {
            latitude: 40.748817,
            longitude: -73.985428,
          },
          {
            latitude: 40.712775,
            longitude: -74.005972,
          }
        )
      ).toThrow("mock-error");
    });
  });
});
