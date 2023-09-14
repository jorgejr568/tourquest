export type GeoLocation = {
  latitude: number;
  longitude: number;
};

export interface GeoDistance {
  /**
   * Calculates the distance between two locations in meters.
   * @param from The starting location.
   * @param to The ending location.
   */
  calculate(from: GeoLocation, to: GeoLocation): number;
}
