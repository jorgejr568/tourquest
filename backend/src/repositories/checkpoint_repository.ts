import { Checkpoint, CheckpointCreateRequest } from "@/dtos";

export interface CheckpointRepository {
  create(request: CheckpointCreateRequest): Promise<Checkpoint>;
  assignToJourney(checkpointId: string, journeyId: string): Promise<void>;

  exists(title: string): Promise<string | false>;
  exists(id: string): Promise<string | false>;

  listByJourneyId(journeyId: string): Promise<Checkpoint[]>;
}
