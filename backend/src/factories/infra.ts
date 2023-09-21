import { JwtTokenization, Tokenization } from "@/infra/tokenization";
import { Factory } from "./_base";
import { GeoDistance, GeolibDistance } from "@/infra/geodistance";

export const infraTokenizationFactory: Factory<Tokenization> = () =>
  new JwtTokenization();

export const infraGeoDistanceFactory: Factory<GeoDistance> = () =>
  new GeolibDistance();
