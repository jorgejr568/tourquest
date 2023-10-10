import axios from "axios";

const BASE_URL = "https://tourquest.j-jr.app";
const BASE_WS = "wss://tourquest.j-jr.app/ws";

const client = axios.create({
  baseURL: BASE_URL,
});

const API = Object.freeze({
  setToken: (token) => {
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
  user: {
    login: async (email, password) => {
      try {
        const { data } = await client.post("/api/v1/users/auth", {
          email,
          password,
        });

        const { token, user } = data;
        return { token, user };
      } catch (error) {
        throw new Error("Invalid credentials");
      }
    },
    me: async () => {
      const { data } = await client.get("/api/v1/users/auth");
      return data;
    },
    register: async (email, password, name) => {
      const {
        data: { token, user },
      } = await client.post("/api/v1/users", {
        email,
        password,
        name,
      });

      return { token, user };
    },
    markCheckpoint: async (checkpointId, { latitude, longitude }) => {
      await client.patch(`/api/v1/users/checkpoints/${checkpointId}`, {
        latitude,
        longitude,
      });
    },
    completedCheckpoints: async () => {
      const { data } = await client.get("/api/v1/users/checkpoints");
      return data;
    },
  },
  journeys: {
    all: async () => {
      const { data } = await client.get("/api/v1/journeys");
      return data;
    },
    checkpoints: async (journeyId) => {
      const { data } = await client.get(
        `/api/v1/journeys/${journeyId}/checkpoints`
      );
      return data;
    },
  },
  wss: {
    new: () => {
      return new WebSocket(BASE_WS, null, {
        headers: {
          Authorization: client.defaults.headers.common["Authorization"],
        },
      });
    },
    sendLocation: (
      ws,
      latitude,
      longitude,
      journeyId = undefined,
      checkpointId = undefined
    ) => {
      ws.send(
        JSON.stringify({
          type: "UserLocationWsMessage",
          data: {
            latitude,
            longitude,
            journeyId,
            checkpointId,
          },
        })
      );
    },
  },
});

export default API;
