import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "../styles/theme";
import { shared, dashStyles } from "../styles/styles";
import { parks as initialParks } from "../test_items/test_data";
import GreetingHeader from "../components/greeting_header";
import TodayPlan from "../components/today_plan";
import { currentUser } from "../test_items/test_data";
import NoPlanCard from "../components/no_plan_card";
import { getProfileById } from "../backend/helper_functions";

export default function Home() {
  const router = useRouter();
  const user = getProfileById(currentUser);

  // Local state so Join toggles update the UI immediately
  const [parkStatus, setParkStatus] = useState<Record<number, boolean>>(
    () => Object.fromEntries(initialParks.map((p) => [p.park_id]))
  );

  const toggleJoin = (id: number) => {
    setParkStatus((prev) => {
      const next = !prev[id];
      // Optional: show a toast-style feedback
      if (next) {
        Alert.alert(
          "You're going! 🐾",
          `RSVP confirmed for ${initialParks.find((p) => p.park_id === id)?.name}.`,
          [{ text: "Great!", style: "default" }]
        );
      }
      return { ...prev, [id]: next };
    });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={shared.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Greeting */}
      <GreetingHeader/>

      {/* Today's Plan */}
      {user.going_park_id.length > 0 ? <TodayPlan user={user}/> : <NoPlanCard/>}

      {/* Stats */}
      <View style={dashStyles.statsGrid}>
        {[
          { val: "12", label: "Parks Visited", icon: "🗺️" },
          { val: "7",  label: "Day Streak",    icon: "🔥" },
          { val: "23", label: "Paw Friends",   icon: "🐾" },
        ].map((s) => (
          <View key={s.label} style={dashStyles.statCard}>
            <Text style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</Text>
            <Text style={dashStyles.statValue}>{s.val}</Text>
            <Text style={dashStyles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Nearby Parks */}
      <View>
        <View style={dashStyles.nearbyHeader}>
          <Text style={dashStyles.nearbyTitle}>Nearby Parks</Text>
          <TouchableOpacity onPress={() => router.push("/(pages)/map" as any)} activeOpacity={0.7}>
            <Text style={dashStyles.nearbyLink}>See map →</Text>
          </TouchableOpacity>
        </View>

        {initialParks.slice(0, 3).map((park) => {
          const going = parkStatus[park.park_id];
          return (
            <View key={park.park_id} style={shared.parkRow}>
              <View
                style={[
                  shared.parkRowIcon,
                  {
                    backgroundColor: going ? theme.accentSoft : theme.surfaceUp,
                    borderWidth: 1,
                    borderColor: going ? theme.accent + "66" : theme.border,
                  },
                ]}
              >
                <Text style={{ fontSize: 20 }}>🌳</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={shared.parkRowName}>{park.name}</Text>
                <Text style={shared.parkRowSub}>{park.dogs_going} dogs</Text>
              </View>

              <TouchableOpacity
                onPress={() => toggleJoin(park.park_id)}
                activeOpacity={0.75}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 20,
                  backgroundColor: going ? theme.accent : theme.surfaceUp,
                  borderWidth: 1,
                  borderColor: going ? "transparent" : theme.border,
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: "600", color: going ? "#000" : theme.muted }}>
                  {going ? "Going" : "Join"}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}