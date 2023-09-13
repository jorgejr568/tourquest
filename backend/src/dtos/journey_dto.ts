type JourneyData = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export class Journey {
  constructor(private readonly data: JourneyData) {}

  get id() {
    return this.data.id;
  }

  get name() {
    return this.data.title;
  }

  get description() {
    return this.data.description;
  }

  get image() {
    return this.data.image;
  }
}

export type JourneyCreateRequest = {
  title: string;
  description: string;
  image: string;
};
