import {
  Checkpoint,
  CheckpointCreateRequest,
  CheckpointMarkAsCompletedRequest,
  CheckpointMarkAsCompletedResponse,
} from "@/dtos";

export interface CheckpointRepository {
  create(request: CheckpointCreateRequest): Promise<Checkpoint>;

  assignToJourney(checkpointId: string, journeyId: string): Promise<void>;

  exists(title: string): Promise<string | false>;

  exists(id: string): Promise<string | false>;

  listByJourneyId(journeyId: string): Promise<Checkpoint[]>;

  listByUserId(userId: string): Promise<Checkpoint[]>;

  markAsDone(
    request: CheckpointMarkAsCompletedRequest,
  ): Promise<CheckpointMarkAsCompletedResponse>;

  findById(id: string): Promise<Checkpoint | null>;
}
