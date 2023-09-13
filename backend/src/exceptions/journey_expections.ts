import { HttpException } from ".";

export class JourneyNotFoundException extends HttpException {
  constructor() {
    super(404, "Journey not found");
  }
}
