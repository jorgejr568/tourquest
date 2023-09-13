import { Reward } from "./reward_dto";
import { Checkpoint } from "./checkpoint_dto";
import { BaseDTO } from "./_base_dto";

type JourneyData = {
  id: string;
  title: string;
  description: string;
  image: string;

  checkpoints?: Checkpoint[];
  rewards?: Reward[];
};

export class Journey extends BaseDTO<JourneyData> {
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

  get checkpoints(): Checkpoint[] {
    return this.data.checkpoints || [];
  }

  get rewards() {
    return this.data.rewards;
  }
}

export type JourneyCreateRequest = {
  title: string;
  description: string;
  image: string;
};

export type JourneyListResponse = Journey[];
