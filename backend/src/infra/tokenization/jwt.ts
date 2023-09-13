import { Environment } from "@/constants";
import { InvalidTokenException } from "@/exceptions";
import jwt from "jsonwebtoken";
import { Tokenization, TokenizationUserData } from "./_interface";

export class JwtTokenization implements Tokenization {
  constructor(
    private readonly secret: string = Environment.JWT_SECRET,
    private readonly expiresIn: string = Environment.JWT_EXPIRES_IN
  ) {}

  sign = (user: TokenizationUserData): string => {
    return jwt.sign(user, this.secret, {
      expiresIn: this.expiresIn,
      algorithm: "HS256",
      subject: user.id,
      issuer: "TourQuest",
    });
  };

  verify = (token: string): TokenizationUserData => {
    try {
      const data = jwt.verify(token, this.secret, {
        algorithms: ["HS256"],
        issuer: "TourQuest",
      }) as TokenizationUserData;

      return {
        id: data.id,
        name: data.name,
        email: data.email,
      };
    } catch (error) {
      throw new InvalidTokenException();
    }
  };
}
