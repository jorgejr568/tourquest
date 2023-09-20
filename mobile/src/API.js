import axios from "axios";

const client = axios.create({
  baseURL: "https://tourquest.j-jr.app",
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
  },
});

export default API;
