import { BaseDTO } from "./_base_dto";
import { Checkpoint } from "./checkpoint_dto";
import { Journey } from "./journey_dto";
import { User } from "./user_dto";

type LocationData = {
  id: string;
  latitude: number;
  longitude: number;

  userId: string;
  journeyId?: string;
  checkpointId?: string;

  createdAt: Date;
};

export class Location extends BaseDTO<LocationData> {
  get id() {
    return this.data.id;
  }

  get latitude() {
    return this.data.latitude;
  }

  get longitude() {
    return this.data.longitude;
  }

  get userId() {
    return this.data.userId;
  }

  get journeyId() {
    return this.data.journeyId;
  }

  get checkpointId() {
    return this.data.checkpointId;
  }

  get createdAt() {
    return this.data.createdAt;
  }
}

export type LocationCreateRequest = {
  userId: string;
  journeyId?: string;
  checkpointId?: string;
  latitude: number;
  longitude: number;
};
