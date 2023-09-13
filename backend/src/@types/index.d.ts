import { TokenizationUserData } from "@/infra/tokenization";

declare global {
  namespace Express {
    interface Request {
      user?: TokenizationUserData;
    }
  }
}
