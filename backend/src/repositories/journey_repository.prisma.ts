import { Journey, JourneyCreateRequest } from "@/dtos";
import { JourneyRepository } from "./journey_repository";
import { Journey as JourneyDocument, PrismaClient } from "@prisma/client";

export class PrismaJourneyRepository implements JourneyRepository {
  constructor(private readonly prisma: PrismaClient) {}

  static toDTO(journey: JourneyDocument): Journey {
    return new Journey({
      id: journey.id,
      title: journey.title,
      description: journey.description,
      shortDescription: journey.shortDescription,
      image: journey.image,
    });
  }

  create = async (request: JourneyCreateRequest): Promise<Journey> => {
    const journey = await this.prisma.journey.create({
      data: {
        title: request.title,
        shortDescription: request.shortDescription,
        description: request.description,
        image: request.image,
      },
    });

    return PrismaJourneyRepository.toDTO(journey);
  };

  exists(title: string): Promise<boolean>;

  exists(id: string): Promise<boolean>;

  exists(id: unknown): Promise<boolean> {
    return this.prisma.journey
      .findFirst({
        where: {
          OR: [{ id: id as string }, { title: id as string }],
        },
      })
      .then((journey) => !!journey);
  }

  findByTitle = (title: string): Promise<Journey | null> => {
    return this.findBy("title", title);
  };

  list = async (): Promise<Journey[]> => {
    const journeys = await this.prisma.journey.findMany();
    return journeys.map((journey) => PrismaJourneyRepository.toDTO(journey));
  };

  private findBy = async (
    key: keyof JourneyDocument,
    value: unknown,
  ): Promise<Journey | null> => {
    const journey = await this.prisma.journey.findFirst({
      where: { [key]: value },
    });

    if (!journey) return null;

    return PrismaJourneyRepository.toDTO(journey);
  };
}
