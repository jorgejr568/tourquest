import { createContext, useCallback, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import API from "../API";

export const UserContext = createContext({
  token: null,
  setToken: (token) => {},
  loading: true,

  user: null,
  logout: () => {},
});

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const loadTokenFromStorage = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        setToken(token);
      }
    } catch (error) {}
  };

  const handleSetToken = useCallback((token) => {
    setToken(token);
    if (token) {
      return SecureStore.setItemAsync("token", token);
    }

    return SecureStore.deleteItemAsync("token");
  }, []);

  const handleLogout = useCallback(() => {
    setToken(null);
    setUser(null);
    SecureStore.deleteItemAsync("token");
  }, []);

  useEffect(() => {
    loadTokenFromStorage();
  }, []);

  useEffect(() => {
    (async () => {
      if (token) {
        setLoading(true);
        API.setToken(token);

        try {
          const user = await API.user.me();
          setUser(user);
        } catch (error) {
          handleSetToken(null);
        }
      }
      setLoading(false);
    })();
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken: handleSetToken,
        user,
        setUser,
        loading,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
