import { PrismaClient, Location as LocationDocument } from "@prisma/client";
import { LocationRepository } from "./location_repository";
import { Journey, Location, LocationCreateRequest } from "@/dtos";

export class PrismaLocationRepository implements LocationRepository {
  constructor(private readonly client: PrismaClient) {}

  async create(request: LocationCreateRequest): Promise<Location> {
    const location = await this.client.location.create({
      data: {
        latitude: request.latitude,
        longitude: request.longitude,
        userId: request.userId,
        journeyId: request.journeyId,
        checkpointId: request.checkpointId,
      },
    });

    return PrismaLocationRepository.toDTO(location);
  }

  static toDTO(location: LocationDocument): Location {
    return new Location({
      id: location.id,
      latitude: location.latitude,
      longitude: location.longitude,
      createdAt: location.createdAt,
      journeyId: location.journeyId || undefined,
      checkpointId: location.checkpointId || undefined,
      userId: location.userId,
    });
  }
}
