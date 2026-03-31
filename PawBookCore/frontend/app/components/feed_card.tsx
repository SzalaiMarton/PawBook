import { View, Text, TouchableOpacity } from "react-native";
import { feedStyles } from "../styles/styles";
import { actionToString, FeedItem } from "../backend/models";
import { useState } from "react";
import { getProfileById, timeElapsed } from "../backend/helper_functions";

function FeedCard({item}: {item: FeedItem}) {
    const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
    const toggleLike = (id: number) => setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));

    return (
        <View key={item.feed_item_id} style={feedStyles.card}>
          <View style={feedStyles.cardBody}>
            {/* Header */}
            <View style={feedStyles.cardHeader}>
              <View style={feedStyles.avatar}>
                {<Text style={{ fontSize: 22 }}>{getProfileById(item.profile_id).profile_picture ? getProfileById(item.profile_id).profile_picture : "🐶"}</Text>}
              </View>
              <View>
                <Text style={feedStyles.userName}>{getProfileById(item.profile_id).dog.dog_name}</Text>
                <Text style={feedStyles.text}>{actionToString(getProfileById(item.profile_id).action)}</Text>
              </View>
              <Text style={feedStyles.time}>{timeElapsed(item.time)}</Text>
            </View>

            {/* Feed item contents */}
            {/* Feed item contents */}
            {/* Feed item contents */}

            {/* Optional image */}
            {item.uploaded_pictures && (
              <View style={feedStyles.imgPlaceholder}>
                <Text style={{ fontSize: 40 }}>{item.uploaded_pictures}</Text>
              </View>
            )}

            {/* Actions */}
            <View style={feedStyles.actions}>
              <TouchableOpacity
                style={feedStyles.actionBtn}
                onPress={() => toggleLike(item.feed_item_id)}
                activeOpacity={0.7}
              >
                <Text style={{ fontSize: 15 }}>{likedPosts[item.feed_item_id] ? "❤️" : "🤍"}</Text>
                <Text style={likedPosts[item.feed_item_id] ? feedStyles.actionLiked : feedStyles.actionText}>
                  {item.likes + (likedPosts[item.feed_item_id] ? 1 : 0)}
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
    );
}

export default FeedCard;