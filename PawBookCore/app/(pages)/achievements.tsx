import { ScrollView, View, Text } from "react-native";
import { theme, achievements } from "../styles/theme";
import { achieveStyles } from "../styles/styles";

export default function AchievementsPage() {
  const earned = achievements.filter((a) => a.earned).length;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <View style={achieveStyles.hero}>
        <Text style={{ fontSize: 36, marginBottom: 8 }}>🏆</Text>
        <Text style={achieveStyles.heroCount}>{earned} Badges Earned</Text>
        <Text style={achieveStyles.heroSub}>Keep visiting parks to unlock more!</Text>
      </View>

      {/* Grid */}
      <View style={achieveStyles.grid}>
        {achievements.map((a) => (
          <View
            key={a.id}
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
            <Text style={achieveStyles.desc}>{a.desc}</Text>

            <View style={achieveStyles.track}>
              <View
                style={[
                  a.earned ? achieveStyles.fillEarned : achieveStyles.fillLocked,
                  { width: `${a.progress}%` as any },
                ]}
              />
            </View>
            <Text style={achieveStyles.progressLabel}>
              {a.earned ? "✓ Earned" : `${a.progress}%`}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
