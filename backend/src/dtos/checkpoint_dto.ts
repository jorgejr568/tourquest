import { Reward } from "./reward_dto";

type CheckpointData = {
  id: string;
  title: string;
  description: string;
  image: string;

  latitude: number;
  longitude: number;

  rewards?: Reward[];
};

export class Checkpoint {
  constructor(private readonly data: CheckpointData) {}

  get id() {
    return this.data.id;
  }

  get title() {
    return this.data.title;
  }

  get description() {
    return this.data.description;
  }

  get image() {
    return this.data.image;
  }

  get latitude() {
    return this.data.latitude;
  }

  get longitude() {
    return this.data.longitude;
  }

  get rewards() {
    return this.data.rewards;
  }
}

export type CheckpointCreateRequest = {
  title: string;
  description: string;
  image: string;
  latitude: number;
  longitude: number;
};
