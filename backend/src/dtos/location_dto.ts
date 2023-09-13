import { BaseDTO } from "./_base_dto";
import { Checkpoint } from "./checkpoint_dto";
import { Journey } from "./journey_dto";
import { User } from "./user_dto";

type LocationData = {
  id: string;
  latitude: number;
  longitude: number;

  user: User;
  journey?: Journey;
  checkpoint?: Checkpoint;

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

  get user() {
    return this.data.user;
  }

  get journey() {
    return this.data.journey;
  }

  get checkpoint() {
    return this.data.checkpoint;
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
