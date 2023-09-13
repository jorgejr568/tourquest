import {
  CheckpointListResponse,
  UserLoginRequest,
  UserLoginResponse,
} from "@/dtos";
import { CredentialsNotMatchException } from "@/exceptions";
import { Tokenization } from "@/infra/tokenization";
import { CheckpointRepository, UserRepository } from "@/repositories";

export interface UserService {
  /**
   * @throws {CredentialsNotMatchException} if the user is not found
   */
  signIn(request: UserLoginRequest): Promise<UserLoginResponse>;

  listCheckpoints(userId: string): Promise<CheckpointListResponse>;
}

export class DefaultUserService implements UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenization: Tokenization,
    private readonly checkpointRepository: CheckpointRepository
  ) {}

  signIn = async (request: UserLoginRequest): Promise<UserLoginResponse> => {
    const user = await this.userRepository.findUserByEmail(request.email);
    if (
      !user ||
      !(await Bun.password.verify(request.password, user.password))
    ) {
      throw new CredentialsNotMatchException();
    }

    const token = this.tokenization.sign({
      id: user.id,
      email: user.email,
    });

    return {
      user,
      token,
    };
  };

  listCheckpoints = async (userId: string): Promise<CheckpointListResponse> => {
    return await this.checkpointRepository.listByUserId(userId);
  };
}
