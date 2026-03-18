import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { theme, friends } from "../styles/theme";
import { shared, friendStyles } from "../styles/styles";

export default function FriendsPage() {
  const router  = useRouter();
  const online  = friends.filter((f) => f.online);
  const offline = friends.filter((f) => !f.online);

  const openChat = (id: number) => router.push(`/pages/chat/${id}` as any);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Search */}
      <View style={[shared.searchBar, { marginBottom: 20 }]}>
        <Text style={{ fontSize: 16 }}>🔍</Text>
        <Text style={shared.searchPlaceholder}>Find dog friends...</Text>
      </View>

      {/* Online */}
      <Text style={[shared.sectionLabel, { color: theme.accent }]}>
        Active Now · {online.length}
      </Text>
      {online.map((f) => (
        <TouchableOpacity
          key={f.id}
          style={friendStyles.row}
          onPress={() => openChat(f.id)}
          activeOpacity={0.7}
        >
          <View style={friendStyles.avatarWrap}>
            <View style={[friendStyles.avatar, { borderWidth: 2, borderColor: theme.green + "44" }]}>
              <Text style={{ fontSize: 24 }}>{f.avatar}</Text>
            </View>
            <View style={[friendStyles.statusDot, { backgroundColor: theme.green }]} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={friendStyles.name}>{f.name}</Text>
            <Text style={friendStyles.sub}>{f.dog} · {f.breed}</Text>
            {f.going && (
              <View style={friendStyles.goingTag}>
                <Text style={friendStyles.goingText}>🏃 Heading to {f.going}</Text>
              </View>
            )}
          </View>
          {/* Chevron hint */}
          <Text style={{ fontSize: 16, color: theme.muted }}>›</Text>
        </TouchableOpacity>
      ))}

      {/* Offline */}
      <View style={{ marginTop: 18 }}>
        <Text style={[shared.sectionLabel, { color: theme.muted }]}>
          Offline · {offline.length}
        </Text>
        {offline.map((f) => (
          <TouchableOpacity
            key={f.id}
            style={[friendStyles.row, { opacity: 0.6 }]}
            onPress={() => openChat(f.id)}
            activeOpacity={0.7}
          >
            <View style={friendStyles.avatarWrap}>
              <View style={[friendStyles.avatar, { borderWidth: 1, borderColor: theme.border }]}>
                <Text style={{ fontSize: 24 }}>{f.avatar}</Text>
              </View>
              <View style={[friendStyles.statusDot, { backgroundColor: theme.muted }]} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={friendStyles.name}>{f.name}</Text>
              <Text style={friendStyles.sub}>{f.dog} · {f.breed}</Text>
            </View>
            <Text style={{ fontSize: 16, color: theme.muted }}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}