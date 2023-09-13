type RewardData = {
  id: string;
  title: string;
  description: string;
};

export class Reward {
  constructor(private readonly data: RewardData) {}

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
