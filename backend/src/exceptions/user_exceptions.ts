import { HttpException } from "./http_exception";

export class CredentialsNotMatchException extends HttpException {
  constructor() {
    super(401, "Credentials not match");
  }
}

export class InvalidTokenException extends HttpException {
  constructor() {
    super(401, "Invalid token");
  }
}

export class UnauthorizedException extends HttpException {
  constructor() {
    super(401, "Unauthorized");
  }
}

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super(409, "User already exists");
  }
}
