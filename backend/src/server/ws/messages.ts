import { z } from "zod";
import { WsAuthMessage } from "./types";

export const UserLocationWsSchema = z.object({
  journeyId: z.string().uuid().optional(),
  checkpointId: z.string().uuid().optional(),
  latitude: z.number(),
  longitude: z.number(),
});

export interface UserLocationWsMessage extends WsAuthMessage {
  type: "UserLocationWsMessage";
  data: z.infer<typeof UserLocationWsSchema>;
}

export type WsMessage = UserLocationWsMessage;
