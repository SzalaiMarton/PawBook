import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { theme, feedItems } from "../styles/theme";
import { feedStyles } from "../styles/styles";
import Filters from "../components/filters";

const FILTERS = ["All", "Going Out", "Check-ins", "Photos"];

export default function FeedPage() {
  const [likedPosts,    setLikedPosts]    = useState<Record<number, boolean>>({});

  const toggleLike = (id: number) =>
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      <Filters filter={FILTERS}/>

      {/* Feed cards */}
      {feedItems.map((item) => (
        <View key={item.id} style={feedStyles.card}>
          <View style={feedStyles.cardBody}>
            {/* Header */}
            <View style={feedStyles.cardHeader}>
              <View style={feedStyles.avatar}>
                <Text style={{ fontSize: 22 }}>{item.avatar}</Text>
              </View>
              <View>
                <Text style={feedStyles.userName}>{item.user}</Text>
                <Text style={feedStyles.userDog}>with {item.dog}</Text>
              </View>
              <Text style={feedStyles.time}>{item.time}</Text>
            </View>

            {/* Text */}
            <Text style={feedStyles.text}>
              <Text style={feedStyles.textBold}>{item.dog}</Text>
              {" "}{item.action}{" "}
              <Text style={feedStyles.textAccent}>{item.place}</Text>
            </Text>

            {/* Optional image */}
            {item.img && (
              <View style={feedStyles.imgPlaceholder}>
                <Text style={{ fontSize: 40 }}>{item.img}</Text>
              </View>
            )}

            {/* Actions */}
            <View style={feedStyles.actions}>
              <TouchableOpacity
                style={feedStyles.actionBtn}
                onPress={() => toggleLike(item.id)}
                activeOpacity={0.7}
              >
                <Text style={{ fontSize: 15 }}>{likedPosts[item.id] ? "❤️" : "🤍"}</Text>
                <Text style={likedPosts[item.id] ? feedStyles.actionLiked : feedStyles.actionText}>
                  {item.likes + (likedPosts[item.id] ? 1 : 0)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={feedStyles.actionBtn} activeOpacity={0.7}>
                <Text style={{ fontSize: 15 }}>💬</Text>
                <Text style={feedStyles.actionText}>{item.comments}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[feedStyles.actionBtn, { marginLeft: "auto" }]} activeOpacity={0.7}>
                <Text style={{ fontSize: 15 }}>🔗</Text>
                <Text style={feedStyles.actionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
