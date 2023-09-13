import { Journey, JourneyCreateRequest } from "@/dtos";

export interface JourneyRepository {
  create(request: JourneyCreateRequest): Promise<Journey>;
}
