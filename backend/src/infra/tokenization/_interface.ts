export type TokenizationUserData = {
  id: string;
  name: string;
  email: string;
};

export interface Tokenization {
  sign(user: TokenizationUserData): string;

  /**
   *
   * @param token
   * @throws {InvalidTokenException}
   */
  verify(token: string): TokenizationUserData;
}
