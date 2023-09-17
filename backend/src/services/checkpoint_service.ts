import {
  CheckpointListResponse,
  CheckpointMarkAsCompletedRequest,
  CheckpointMarkAsCompletedResponse,
} from "@/dtos";
import { CheckpointRepository } from "@/repositories";

export interface CheckpointService {
  userListCheckpoints(userId: string): Promise<CheckpointListResponse>;

  userMarkCheckpointAsCompleted(
    request: CheckpointMarkAsCompletedRequest
  ): Promise<CheckpointMarkAsCompletedResponse>;
}

export class DefaultCheckpointService implements CheckpointService {
  constructor(private readonly checkpointRepository: CheckpointRepository) {}

  async userListCheckpoints(userId: string): Promise<CheckpointListResponse> {
    return await this.checkpointRepository.listByUserId(userId);
  }

  async userMarkCheckpointAsCompleted(
    request: CheckpointMarkAsCompletedRequest
  ): Promise<CheckpointMarkAsCompletedResponse> {
    return await this.checkpointRepository.markAsDone(request);
  }
}
