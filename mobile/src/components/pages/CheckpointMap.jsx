import { SafeAreaView, StyleSheet, View } from "react-native";
import useWatchLocation from "../../hooks/useWatchLocation";
import withAuth from "../../middlewares/auth.middleware";
import withLocation from "../../middlewares/location.middleware";
import Navbar from "../organisms/Navbar";
import { Button, Text } from "react-native-paper";
import { useEffect, useMemo, useRef, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import MapView, { Marker } from "react-native-maps";
import withTheme from "../../middlewares/theme.middleware";
import distanceFormatter from "../../utils/distanceFormatter";
import durationFormatter from "../../utils/durationFormatter";

function CheckpointMapPage({ navigation, location, route, theme }) {
  const { checkpoint } = route.params;
  const [distance, setDistance] = useState(undefined);
  const [duration, setDuration] = useState(undefined);
  const initialLocation = useRef(location);

  const mapRef = useRef(null);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.elevation.level1,
        },
        mapContainer: {
          flex: 1,
        },
        map: {
          height: "60%",
          maxHeight: 400,
          width: "100%",
          marginBottom: 24,
        },
        distance: {
          textAlign: "center",
          marginVertical: 16,
          fontSize: 42,
          fontWeight: "bold",
        },
        duration: {
          textAlign: "center",
          fontSize: 20,
        },
        mapInfoContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 24,
        },
      }),
    [theme]
  );

  useWatchLocation();

  useEffect(() => {
    mapRef.current?.animateCamera({
      center: location,
    });
  }, [location]);

  const destinationCoords = useMemo(
    () => ({
      latitude: checkpoint.latitude,
      longitude: checkpoint.longitude,
    }),
    [checkpoint]
  );

  const canComplete = useMemo(() => {
    return distance < checkpoint.range;
  }, [distance]);

  return (
    <View style={{ flex: 1 }}>
      <Navbar title={`Caminho até ${checkpoint.title}`} />
      <SafeAreaView style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              ...initialLocation.current,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker title="Você está aqui" coordinate={location} />
            <Marker
              pinColor="#194d33"
              title={checkpoint.title}
              coordinate={destinationCoords}
            />
            <MapViewDirections
              origin={initialLocation.current}
              destination={destinationCoords}
              apikey={"AIzaSyA3ewAlIlB8ybaKUHiwFpAWZqGDCNbEkY8"}
              strokeWidth={5}
              strokeColor={theme.colors.primary}
              onReady={(result) => {
                mapRef.current?.fitToCoordinates(result.coordinates, {
                  edgePadding: { top: 50, bottom: 50, left: 50, right: 50 },
                });
                setDistance(result.distance * 1000);
                setDuration(result.duration * 60);
              }}
            />
          </MapView>

          <View style={styles.mapInfoContainer}>
            {distance && (
              <Text style={styles.distance}>{distanceFormatter(distance)}</Text>
            )}
            {duration && (
              <Text style={styles.duration}>
                Você chegará em {durationFormatter(duration)}
              </Text>
            )}
          </View>

          <Button
            style={{ margin: 16 }}
            mode="contained"
            onPress={() => navigation.navigate("Reward", { checkpoint })}
            disabled={!canComplete}
          >
            {canComplete
              ? "Marcar como concluído"
              : "Quase lá! Aproxime-se um pouco mais"}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default withAuth(withLocation(withTheme(CheckpointMapPage)));
