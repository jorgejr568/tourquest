import { describe, expect, it } from "bun:test";
import { infraGeoDistanceFactory } from "./infra";
import { GeolibDistance } from "@/infra/geodistance";

describe("factories.infra", () => {
  describe("infraGeoDistanceFactory", () => {
    it("should return a GeolibDistance instance", () => {
      expect(infraGeoDistanceFactory()).toBeInstanceOf(GeolibDistance);
    });
  });
});
