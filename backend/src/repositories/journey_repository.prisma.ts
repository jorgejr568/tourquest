import { JourneyCreateRequest, Journey } from "@/dtos";
import { JourneyRepository } from "./journey_repository";
import { PrismaClient } from "@prisma/client";

export class PrismaJourneyRepository implements JourneyRepository {
  constructor(private readonly prisma: PrismaClient = new PrismaClient()) {}

  create = async (request: JourneyCreateRequest): Promise<Journey> => {
    const journey = await this.prisma.journey.create({
      data: {
        title: request.title,
        description: request.description,
        image: request.image,
      },
    });

    return new Journey({
      id: journey.id,
      title: journey.title,
      description: journey.description,
      image: journey.image,
    });
  };
}
