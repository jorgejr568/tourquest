import { FlatList, StyleSheet, View } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import API from "../../API";
import useErrors from "../../hooks/useErrors";
import { BaseLayout } from "../_layout/base";
import JourneyCard from "../molecules/JourneyCard";
import useUser from "../../hooks/useUser";
import RegisterOrSignIn from "../molecules/RegisterOrSignIn";

function Home() {
  const { userCompletedCheckpoints } = useUser();
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const errors = useErrors();

  useEffect(() => {
    API.journeys
      .all()
      .then(setJourneys)
      .catch(() => {
        errors.pushError("Erro ao carregar jornadas");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const isJourneyCompleted = useCallback(
    (journey) => {
      return journey.checkpoints.every((checkpoint) =>
        userCompletedCheckpoints.includes(checkpoint.id)
      );
    },
    [userCompletedCheckpoints]
  );

  return (
    <BaseLayout>
      <BaseLayout.Navbar title="Jornadas em Teresópolis ⛰️" />
      <BaseLayout.Content>
        {!loading && (
          <View style={styles.listContainer}>
            <FlatList
              data={journeys}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.journeyItem}>
                  <JourneyCard
                    journey={item}
                    completed={isJourneyCompleted(item)}
                  />
                </View>
              )}
            />
          </View>
        )}
      </BaseLayout.Content>

      <RegisterOrSignIn />
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  journeyItem: {
    marginVertical: 20,
    marginHorizontal: 24,
  },
});

export default Home;
