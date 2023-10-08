import { GeoDistance, GeoLocation } from "./_interface";
import { getDistance } from "geolib";

export class GeolibDistance implements GeoDistance {
  constructor(private readonly calculateDistanceMethod = getDistance) {}

  calculate(from: GeoLocation, to: GeoLocation): number {
    return this.calculateDistanceMethod(
      {
        lat: from.latitude,
        lon: from.longitude,
      },
      {
        lat: to.latitude,
        lon: to.longitude,
      },
    );
  }
}
