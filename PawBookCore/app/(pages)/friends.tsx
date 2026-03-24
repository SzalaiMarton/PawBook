import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "../styles/theme";
import { shared, friendStyles, mapStyle } from "../styles/styles";
import { getLocation, getProfileById, getProfilePicture } from "../backend/helper_functions";
import { actionToString, dogbreedToString } from "../backend/types";
import { currentUser } from "../test_items/test_data";
import CustomSearchBar from "../components/search_bar";
import { useState } from "react";

export default function FriendsPage() {
  const user = getProfileById(currentUser);
  const router  = useRouter();
  const online  = user.friend_id.filter((id) => getProfileById(id).is_online);
  const offline = user.friend_id.filter((id) => !getProfileById(id).is_online);
  const [search, setSearch] = useState<string>("");

  const openChat = (id: number) => router.push(`/(pages)/(chat)/${id}` as any);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Search */}
      <CustomSearchBar
      search={search}
      setSearch={setSearch}
      defaultText="Search For a friend..."
      searchBar={mapStyle.searchBar}
      searchInput={mapStyle.searchInput}
      searchWrap={mapStyle.searchWrap}
      />

      {/* Online */}
      <Text style={[shared.sectionLabel, { color: theme.accent }]}>
        Active Now · {online.length}
      </Text>
      {online.map((id) => {
        const profile = getProfileById(id);

        return (
          <TouchableOpacity
            key={id}
            style={friendStyles.row}
            onPress={() => openChat(id)}
            activeOpacity={0.7}
          >
          <View style={friendStyles.avatarWrap}>
            <View style={[friendStyles.avatar, { borderWidth: 2, borderColor: theme.green + "44" }]}>
              <Text style={{ fontSize: 24 }}>{getProfilePicture(profile)}</Text>
            </View>
            <View style={[friendStyles.statusDot, { backgroundColor: theme.green }]} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={friendStyles.name}>{profile.owner_name}</Text>
            <Text style={friendStyles.sub}>{profile.dog.dog_name} · {dogbreedToString(profile.dog.dog_breed)}</Text>
            {getLocation(profile) && (
              <View style={friendStyles.goingTag}>
                <Text style={friendStyles.goingText}>🏃 Heading to {actionToString(profile.action)}</Text>
              </View>
            )}
          </View>
          {/* Chevron hint */}
          <Text style={{ fontSize: 16, color: theme.muted }}>›</Text>
        </TouchableOpacity>
      )})}

      {/* Offline */}
      <View style={{ marginTop: 18 }}>
        <Text style={[shared.sectionLabel, { color: theme.muted }]}>
          Offline · {offline.length}
        </Text>
        {offline.map((friend) => (
          <TouchableOpacity
            key={friend}
            style={[friendStyles.row, { opacity: 0.6 }]}
            onPress={() => openChat(friend)}
            activeOpacity={0.7}
          >
            <View style={friendStyles.avatarWrap}>
              <View style={[friendStyles.avatar, { borderWidth: 1, borderColor: theme.border }]}>
                <Text style={{ fontSize: 24 }}>{getProfilePicture(getProfileById(friend))}</Text>
              </View>
              <View style={[friendStyles.statusDot, { backgroundColor: theme.muted }]} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={friendStyles.name}>{getProfileById(friend).owner_name}</Text>
              <Text style={friendStyles.sub}>{getProfileById(friend).dog.dog_name} · {dogbreedToString(getProfileById(friend).dog.dog_breed)}</Text>
            </View>
            <Text style={{ fontSize: 16, color: theme.muted }}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}