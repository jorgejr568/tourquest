import { infraTokenizationFactory } from "@/factories/infra";
import { WithAuthorizationNext, Ws, WsAuthMessage } from "./types";
import { InvalidTokenException } from "@/exceptions";
import { Tokenization } from "@/infra/tokenization";

type WithAuthorizationContainer = {
  tokenization: Tokenization;
};

export const withAuthorization = async <T extends WsAuthMessage>(
  ws: Ws,
  message: T,
  next: WithAuthorizationNext<T>,
  { tokenization }: WithAuthorizationContainer = {
    tokenization: infraTokenizationFactory(),
  },
) => {
  try {
    const user = tokenization.verify(message.authorization);
    await next(ws, message, user);
  } catch (error) {
    if (error instanceof InvalidTokenException) {
      ws.close(4000, "Invalid authorization");
      return;
    }

    throw error;
  }
};
