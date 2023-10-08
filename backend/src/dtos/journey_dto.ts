import { Reward } from "./reward_dto";
import { Checkpoint } from "./checkpoint_dto";
import { BaseDTO } from "./_base_dto";

type JourneyData = {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;

  checkpoints?: Checkpoint[];
  rewards?: Reward[];
};

type JourneyDataJSON = Omit<JourneyData, "description"> & {
  description: string[];
};

export class Journey extends BaseDTO<JourneyData, JourneyDataJSON> {
  get id() {
    return this.data.id;
  }

  get title() {
    return this.data.title;
  }

  get description(): string[] {
    return this.data.description
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }

  get shortDescription() {
    return this.data.shortDescription;
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

  toJSON() {
    return {
      ...super.toJSON(),
      description: this.description,
    };
  }
}

export type JourneyCreateRequest = {
  title: string;
  shortDescription: string;
  description: string;
  image: string;
};

export type JourneyListResponse = Journey[];
