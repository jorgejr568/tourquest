import {
  CheckpointListResponse,
  UserCreateRequest,
  UserCreateResponse,
  UserLoginRequest,
  UserLoginResponse,
} from "@/dtos";
import {
  CredentialsNotMatchException,
  UserAlreadyExistsException,
} from "@/exceptions";
import { Tokenization } from "@/infra/tokenization";
import { CheckpointRepository, UserRepository } from "@/repositories";

export interface UserService {
  /**
   * @throws {CredentialsNotMatchException} if the user is not found
   */
  signIn(request: UserLoginRequest): Promise<UserLoginResponse>;

  listCheckpoints(userId: string): Promise<CheckpointListResponse>;

  /**
   * @throws {UserAlreadyExistsException} if the user already exists
   */
  signUp(request: UserCreateRequest): Promise<UserCreateResponse>;
}

export class DefaultUserService implements UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenization: Tokenization,
    private readonly checkpointRepository: CheckpointRepository
  ) {}

  async signIn(request: UserLoginRequest): Promise<UserLoginResponse> {
    const user = await this.userRepository.findUserByEmail(request.email);
    if (
      !user ||
      !(await Bun.password.verify(request.password, user.password))
    ) {
      throw new CredentialsNotMatchException();
    }

    const token = this.tokenization.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      user,
      token,
    };
  }

  async listCheckpoints(userId: string): Promise<CheckpointListResponse> {
    return await this.checkpointRepository.listByUserId(userId);
  }

  async signUp(request: UserCreateRequest): Promise<UserCreateResponse> {
    if (await this.userRepository.findUserByEmail(request.email)) {
      throw new UserAlreadyExistsException();
    }

    const user = await this.userRepository.create(request);
    const token = this.tokenization.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      user,
      token,
    };
  }
}
