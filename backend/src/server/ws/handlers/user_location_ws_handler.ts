import { TokenizationUserData } from "@/infra/tokenization";
import { UserLocationWsMessage, UserLocationWsSchema } from "../messages";
import { Ws } from "../types";
import { LocationService } from "@/services";
import { locationServiceFactory } from "@/factories";

type HandleUserLocationWsMessageContainer = {
  service: LocationService;
};
export const handleUserLocationWsMessage = async (
  ws: Ws,
  message: UserLocationWsMessage,
  user: TokenizationUserData,
  { service }: HandleUserLocationWsMessageContainer = {
    service: locationServiceFactory(),
  },
) => {
  const result = await service.create({
    userId: user.id,
    ...UserLocationWsSchema.parse(message.data),
  });

  ws.send(`Location saved ${result.id}`);
};
