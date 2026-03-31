import { ScrollView, View, Text } from "react-native";
import { theme } from "../styles/theme";
import { achieveStyles } from "../styles/styles";
import { achievements } from "../test_items/test_data";

export default function AchievementsPage() {
  const earned = achievements.filter((a) => a.earned).length;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Summary Bubble */}
      <View style={achieveStyles.hero}>
        <Text style={{ fontSize: 36, marginBottom: 8 }}>🏆</Text>
        <Text style={achieveStyles.heroCount}>{earned} Badges Earned</Text>
        <Text style={achieveStyles.heroSub}>Keep visiting parks to unlock more!</Text>
      </View>

      {/* Grid */}
      <View style={achieveStyles.grid}>
        {achievements.map((a) => (
          <View
            key={a.achievement_id}
            style={[
              achieveStyles.card,
              a.earned
                ? { backgroundColor: "rgba(245,166,35,0.08)", borderColor: "rgba(245,166,35,0.27)" }
                : { backgroundColor: theme.card, borderColor: theme.border, opacity: 0.8 },
            ]}
          >
            <Text style={{ fontSize: 30, marginBottom: 8 }}>{a.icon}</Text>
            <Text style={a.earned ? achieveStyles.titleEarned : achieveStyles.titleLocked}>
              {a.title}
            </Text>
            <Text style={achieveStyles.desc}>{a.description}</Text>

            <View style={achieveStyles.track}>
              <View
                style={[
                  a.earned ? achieveStyles.fillEarned : achieveStyles.fillLocked,
                  { width: `${a.progression}%` as any },
                ]}
              />
            </View>
            <Text style={achieveStyles.progressLabel}>
              {a.earned ? "✓ Earned" : `${a.progression}%`}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
