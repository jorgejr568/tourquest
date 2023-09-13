import { Location, LocationCreateRequest } from "@/dtos";
import { LocationRepository } from "@/repositories";

export interface LocationService {
  create(request: LocationCreateRequest): Promise<Location>;
}

export class DefaultLocationService implements LocationService {
  constructor(private readonly repository: LocationRepository) {}

  async create(request: LocationCreateRequest): Promise<Location> {
    return await this.repository.create(request);
  }
}
