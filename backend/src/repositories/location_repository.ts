import { Location, LocationCreateRequest } from "@/dtos";

export interface LocationRepository {
  create(request: LocationCreateRequest): Promise<Location>;
}
