import { Journey, JourneyCreateRequest } from "@/dtos";

export interface JourneyRepository {
  create(request: JourneyCreateRequest): Promise<Journey>;

  exists(title: string): Promise<boolean>;
  exists(id: string): Promise<boolean>;

  findByTitle(title: string): Promise<Journey | null>;
  list(): Promise<Journey[]>;
}
