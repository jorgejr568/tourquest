import {
  CheckpointListResponse,
  CheckpointMarkAsCompletedRequest,
  CheckpointMarkAsCompletedResponse,
} from "@/dtos";
import { GeoDistance } from "@/infra/geodistance";
import { CheckpointRepository } from "@/repositories";
import {
  CheckpointNotFoundException,
  CheckpointNotReachedException,
} from "@/exceptions";

export interface CheckpointService {
  userListCheckpoints(userId: string): Promise<CheckpointListResponse>;

  /**
   * @throws CheckpointNotFoundException
   * @param request
   */
  userMarkCheckpointAsCompleted(
    request: CheckpointMarkAsCompletedRequest,
  ): Promise<CheckpointMarkAsCompletedResponse>;
}

export class DefaultCheckpointService implements CheckpointService {
  constructor(
    private readonly checkpointRepository: CheckpointRepository,
    private readonly infraGeoDistance: GeoDistance,
  ) {}

  async userListCheckpoints(userId: string): Promise<CheckpointListResponse> {
    return await this.checkpointRepository.listByUserId(userId);
  }

  async userMarkCheckpointAsCompleted(
    request: CheckpointMarkAsCompletedRequest,
  ): Promise<CheckpointMarkAsCompletedResponse> {
    const checkpoint = await this.checkpointRepository.findById(
      request.checkpointId,
    );
    if (!checkpoint) {
      throw new CheckpointNotFoundException();
    }

    const distance = this.infraGeoDistance.calculate(
      {
        latitude: request.latitude,
        longitude: request.longitude,
      },
      {
        latitude: checkpoint.latitude,
        longitude: checkpoint.longitude,
      },
    );

    if (distance > checkpoint.range) {
      throw new CheckpointNotReachedException();
    }

    return await this.checkpointRepository.markAsDone(request);
  }
}
