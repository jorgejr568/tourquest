import {
  Checkpoint,
  CheckpointListResponse,
  Journey,
  JourneyListResponse,
} from "@/dtos";
import { JourneyNotFoundException } from "@/exceptions";
import { CheckpointRepository, JourneyRepository } from "@/repositories";

export interface JourneyService {
  listJourneys(): Promise<Journey[]>;

  listJourneyCheckpoints(journeyId: string): Promise<Checkpoint[]>;
}

export class DefaultJourneyService implements JourneyService {
  constructor(
    private readonly journeyRepository: JourneyRepository,
    private readonly checkpointRepository: CheckpointRepository,
  ) {}

  listJourneys = async (): Promise<JourneyListResponse> => {
    return await this.journeyRepository.list();
  };

  listJourneyCheckpoints = async (
    journeyId: string,
  ): Promise<CheckpointListResponse> => {
    if (!(await this.journeyRepository.exists(journeyId))) {
      throw new JourneyNotFoundException();
    }

    return await this.checkpointRepository.listByJourneyId(journeyId);
  };
}
