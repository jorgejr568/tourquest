import { CheckpointCreateRequest, Checkpoint } from "@/dtos";
import { CheckpointRepository } from "./checkpoint_repository";
import { PrismaClient, Checkpoint as CheckpointDocument } from "@prisma/client";

export class PrismaCheckpointRepository implements CheckpointRepository {
  constructor(private readonly prisma: PrismaClient = new PrismaClient()) {}

  async create(request: CheckpointCreateRequest): Promise<Checkpoint> {
    const checkpoint = await this.prisma.checkpoint.create({
      data: {
        title: request.title,
        description: request.description,
        image: request.image,
        latitude: request.latitude,
        longitude: request.longitude,
      },
    });

    return this.toDto(checkpoint);
  }

  async assignToJourney(
    checkpointId: string,
    journeyId: string
  ): Promise<void> {
    await this.prisma.journeyCheckpoint.upsert({
      where: {
        journeyId_checkpointId: {
          checkpointId,
          journeyId,
        },
      },
      create: {
        checkpointId,
        journeyId,
      },
      update: {},
    });
  }

  exists(title: string): Promise<string | false>;
  exists(id: string): Promise<string | false>;
  async exists(id: unknown): Promise<string | false> {
    const checkpoint = await this.prisma.checkpoint.findFirst({
      where: {
        OR: [{ id: id as string }, { title: id as string }],
      },
    });

    if (!checkpoint) return false;
    return checkpoint.id;
  }

  async listByJourneyId(journeyId: string): Promise<Checkpoint[]> {
    const checkpoints = await this.prisma.journeyCheckpoint.findMany({
      where: { journeyId },
      include: { Checkpoint: true },
    });

    return checkpoints.map(({ Checkpoint }) => this.toDto(Checkpoint));
  }

  async listByUserId(userId: string): Promise<Checkpoint[]> {
    const checkpoints = await this.prisma.userCompletedCheckpoints.findMany({
      where: { userId },
      include: { Checkpoint: true },
    });

    return checkpoints.map(({ Checkpoint }) => this.toDto(Checkpoint));
  }

  private toDto = (checkpoint: CheckpointDocument): Checkpoint => {
    return new Checkpoint({
      id: checkpoint.id,
      title: checkpoint.title,
      description: checkpoint.description,
      image: checkpoint.image,
      latitude: checkpoint.latitude,
      longitude: checkpoint.longitude,
    });
  };
}
