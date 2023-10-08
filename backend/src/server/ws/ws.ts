import { Environment } from "@/constants";
import { WsMessage } from "./messages";
import { WsUpgrade } from "./types";
import { withAuthorization } from "./middlewares";
import { handleUserLocationWsMessage } from "./handlers";

const server = Bun.serve<WsUpgrade>({
  fetch(req, server) {
    const success = server.upgrade(req, {
      data: { authorization: req.headers.get("authorization") },
    });
    if (success) {
      return undefined;
    }

    return new Response("Not found", { status: 404 });
  },

  websocket: {
    async message(ws, message) {
      try {
        const ms: WsMessage = JSON.parse(message.toString());
        if (!ms || typeof ms !== "object") {
          throw new Error("Data is not an object");
        }

        if (ws.data?.authorization) {
          ms.authorization = ws.data.authorization.split(" ").pop() as string;
        }

        if (ms.type === "UserLocationWsMessage") {
          await withAuthorization(ws, ms, handleUserLocationWsMessage);
        }
      } catch (e: any) {
        const eType = e?.constructor?.name ?? "Unknown";
        console.error(`Error while handling message`, {
          type: eType,
          message: e?.message || e,
        });
      }
    },
  },
  port: Environment.WS_PORT,
});

console.log(`Websocket Server is running: ws://localhost:${server.port}`);
