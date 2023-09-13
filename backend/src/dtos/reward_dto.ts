import { BaseDTO } from "./_base_dto";

type RewardData = {
  id: string;
  title: string;
  description: string;
};

export class Reward extends BaseDTO<RewardData> {
  get id() {
    return this.data.id;
  }

  get title() {
    return this.data.title;
  }

  get description() {
    return this.data.description;
  }
}
