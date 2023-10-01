import { useEffect, useRef, useState } from "react";
import useLocation from "./useLocation";
import API from "../API";

export default function useWatchLocation() {
  const wss = useRef();
  const { location } = useLocation();
  const [lastLocation, setLastLocation] = useState();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    wss.current = API.wss.new();
    wss.current.onopen = () => {
      setConnected(true);
    };

    wss.current.onmessage = (e) => {
      const uuidRegex = /([a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8})/gi;
      const matches = e.data.match(uuidRegex);

      if (matches && matches.length > 0) {
        setLastLocation(matches[0]);
      }
    };

    wss.current.onclose = () => {
      setConnected(false);
    };

    return () => {
      wss.current.close();
    };
  }, []);

  useEffect(() => {
    if (!wss.current) return;

    if (wss.current.readyState !== WebSocket.OPEN) {
      wss.current.onopen = () => {
        API.wss.sendLocation(
          wss.current,
          location.latitude,
          location.longitude
        );
      };
      return;
    }

    API.wss.sendLocation(wss.current, location.latitude, location.longitude);
  }, [wss.current, location]);

  return {
    lastLocation,
    connected,
    wss,
  };
}
