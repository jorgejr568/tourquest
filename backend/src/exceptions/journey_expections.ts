import { HttpException } from ".";

export class JourneyNotFoundException extends HttpException {
  constructor() {
    super(404, "Journey not found");
  }
}

export class CheckpointNotFoundException extends HttpException {
  constructor() {
    super(404, "Checkpoint not found");
  }
}

export class CheckpointNotReachedException extends HttpException {
  constructor() {
    super(400, "Checkpoint not reached");
  }
}
