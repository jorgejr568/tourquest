import { TokenizationUserData } from "@/infra/tokenization";
import { UserLocationWsMessage, UserLocationWsSchema } from "../messages";
import { Ws } from "../types";
import { PrismaClient } from "@prisma/client";

type HandleUserLocationWsMessageContainer = {
  prisma: PrismaClient;
};
export const handleUserLocationWsMessage = async (
  ws: Ws,
  message: UserLocationWsMessage,
  user: TokenizationUserData,
  { prisma }: HandleUserLocationWsMessageContainer = {
    prisma: new PrismaClient(),
  }
) => {
  const result = await prisma.location.create({
    data: {
      userId: user.id,
      ...UserLocationWsSchema.parse(message.data),
    },
  });

  ws.send(`Location saved ${result.id}`);
};
