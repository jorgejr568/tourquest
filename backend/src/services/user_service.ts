import { UserLoginRequest, UserLoginResponse } from "@/dtos";
import { CredentialsNotMatchException } from "@/exceptions";
import { Tokenization } from "@/infra/tokenization";
import { UserRepository } from "@/repositories";

export interface UserService {
  /**
   * @throws {CredentialsNotMatchException} if the user is not found
   */
  signIn(request: UserLoginRequest): Promise<UserLoginResponse>;
}

export class DefaultUserService implements UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly tokenization: Tokenization
  ) {}

  signIn = async (request: UserLoginRequest): Promise<UserLoginResponse> => {
    const user = await this.repository.findUserByEmail(request.email);
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
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    };
  };
}
