import { View, Text, TouchableOpacity } from "react-native";
import { feedStyles } from "../styles/styles";
import { actionToString, FeedItem } from "../types";
import { useState } from "react";
import { getLocation } from "../helper_functions";

function FeedCard({item}: {item: FeedItem}) {
    const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
    const toggleLike = (id: number) => setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));

    return (
        <View key={item.feed_item_id} style={feedStyles.card}>
          <View style={feedStyles.cardBody}>
            {/* Header */}
            <View style={feedStyles.cardHeader}>
              <View style={feedStyles.avatar}>
                {<Text style={{ fontSize: 22 }}>{item.profile.profile_picture ? item.profile.profile_picture : "🐶"}</Text>}
              </View>
              <View>
                <Text style={feedStyles.userName}>{item.profile.dog.dog_name}</Text>
              </View>
              <Text style={feedStyles.time}>{item.time}</Text>
            </View>

            {/* Text */}
            <Text style={feedStyles.text}>
              <Text style={feedStyles.textBold}>{actionToString(item.profile.action)}</Text>
              {" "}{actionToString(item.profile.action)}{" "}
              <Text style={feedStyles.textAccent}>{getLocation(item.profile)}</Text>
            </Text>

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