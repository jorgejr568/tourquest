import { TokenizationUserData } from "@/infra/tokenization";
import { ServerWebSocket } from "bun";

export interface WsAuthMessage {
  authorization: string;
}

export type WsUpgrade = {
  authorization?: string;
};

export type Ws = ServerWebSocket<WsUpgrade>;

export type WithAuthorizationNext<T extends WsAuthMessage> = (
  ws: Ws,
  message: T,
  user: TokenizationUserData,
) => any;
