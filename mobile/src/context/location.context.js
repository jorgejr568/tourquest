import { createContext, useState } from "react";

export const LocationContext = createContext({
  location: {
    latitude: 0,
    longitude: 0,
  },
  setLocation: () => {},
});

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
