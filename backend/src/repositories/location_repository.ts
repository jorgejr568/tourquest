import { LocationCreateRequest } from "@/dtos";
import { Location } from "@prisma/client";

export interface LocationRepository {
  create(request: LocationCreateRequest): Promise<Location>;
}
