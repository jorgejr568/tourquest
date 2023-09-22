import * as Location from "expo-location";
import { useCallback, useEffect, useRef, useState } from "react";
import LoadingPage from "../components/pages/Loading";
import LocationRequestPage from "../components/pages/LocationRequest";
import useErrors from "../hooks/useErrors";

function LocationMiddleware({ Component, ...props }) {
  const watchRef = useRef();
  const [location, setLocation] = useState();
  const errors = useErrors();

  const [locationPermission, setLocationPermission] = useState(false);
  const [loading, setLoading] = useState(true);

  const requestLocation = useCallback(async () => {
    errors.clear();

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      errors.pushError("Não foi possível obter a sua localização");
      return;
    }

    setLocationPermission(true);
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status === "granted") {
        setLocationPermission(true);
      }

      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (locationPermission) {
        watchRef.current = await Location.watchPositionAsync(
          {
            distanceInterval: 1,
            accuracy: Location.Accuracy.BestForNavigation,
          },
          ({ coords: { latitude, longitude } }) => {
            setLocation({ latitude, longitude });
          }
        );

        let {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({});
        setLocation({ latitude, longitude });
      }
    })();

    return () => {
      watchRef.current && watchRef.current.remove();
    };
  }, [locationPermission]);

  if (loading) return <LoadingPage />;

  if (!locationPermission) {
    return <LocationRequestPage requestLocation={requestLocation} />;
  }

  if (!location) {
    return <LoadingPage />;
  }

  return <Component {...props} location={location} />;
}

export default function withLocation(Component) {
  return (props) => <LocationMiddleware Component={Component} {...props} />;
}
