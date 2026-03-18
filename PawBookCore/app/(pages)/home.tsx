import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { theme, parks as initialParks } from "../styles/theme";
import { shared, dashStyles } from "../styles/styles";

export default function Home() {
  const router = useRouter();

  // Local state so Join toggles update the UI immediately
  const [parkStatus, setParkStatus] = useState<Record<number, boolean>>(
    () => Object.fromEntries(initialParks.map((p) => [p.id, p.going]))
  );

  const toggleJoin = (id: number) => {
    setParkStatus((prev) => {
      const next = !prev[id];
      // Optional: show a toast-style feedback
      if (next) {
        Alert.alert(
          "You're going! 🐾",
          `RSVP confirmed for ${initialParks.find((p) => p.id === id)?.name}.`,
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
      <View>
        <Text style={dashStyles.greetingSub}>Good afternoon,</Text>
        <Text style={dashStyles.greetingMain}>Alex &amp; Buddy 🐶</Text>
      </View>

      {/* Today's Plan */}
      <View style={dashStyles.todayCard}>
        <Text style={dashStyles.todayLabel}>Today's Plan</Text>
        <View style={dashStyles.todayInner}>
          <View style={dashStyles.todayIcon}>
            <Text style={{ fontSize: 24 }}>🏞️</Text>
          </View>
          <View>
            <Text style={dashStyles.todayTitle}>Riverside Bark Park</Text>
            <Text style={dashStyles.todaySub}>Today at 3:00 PM · 7 dogs attending</Text>
          </View>
        </View>
        <View style={dashStyles.todayTags}>
          {["🐕 Sarah", "🐺 Jake", "+5"].map((tag) => (
            <View
              key={tag}
              style={[shared.card, { paddingHorizontal: 11, paddingVertical: 5, backgroundColor: theme.surface }]}
            >
              <Text style={{ fontSize: 12, color: theme.text }}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

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
          <TouchableOpacity onPress={() => router.push("/pages/map" as any)} activeOpacity={0.7}>
            <Text style={dashStyles.nearbyLink}>See map →</Text>
          </TouchableOpacity>
        </View>

        {initialParks.slice(0, 3).map((park) => {
          const going = parkStatus[park.id];
          return (
            <View key={park.id} style={shared.parkRow}>
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
                <Text style={shared.parkRowSub}>{park.dogs} dogs · {park.time}</Text>
              </View>

              <TouchableOpacity
                onPress={() => toggleJoin(park.id)}
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
                  {going ? "Going ✓" : "Join"}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}