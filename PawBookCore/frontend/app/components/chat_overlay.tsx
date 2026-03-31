import { useRef, useEffect, useState } from "react";
import { Animated, Modal, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { mapStyle, overlayStyles } from "../styles/styles";
import { theme } from "../styles/theme";
import { getProfileById, getUnreadMessages } from "../backend/helper_functions";
import { currentUser } from "../test_items/test_data";
import CustomSearchBar from "./search_bar";

function ChatOverlay({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const slideX = useRef(new Animated.Value(300)).current;
  const [isMounted, setMounted] = useState(visible);
  const user = getProfileById(currentUser);
  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.spring(slideX, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80, 
        friction: 12,
      }).start();
    } else {
      Animated.spring(slideX, {
        toValue: 300,
        useNativeDriver: true,
        tension: 80, 
        friction: 12,
      }).start(() => {
        setMounted(false);
      });
    }
  }, [visible]);

  if (!isMounted) return null;  

  return (
    <Modal 
    transparent animationType="fade" 
    visible={visible} 
    onRequestClose={onClose}>
      <View style={StyleSheet.absoluteFill}>
        <TouchableOpacity style={overlayStyles.backdrop} onPress={onClose} activeOpacity={1} />
        <Animated.View style={[overlayStyles.chatPanel, { transform: [{ translateX: slideX }] }]}>
          <View style={overlayStyles.chatHeader}>
            <Text style={overlayStyles.chatTitle}>Messages</Text>
            <TouchableOpacity style={overlayStyles.chatCloseBtn} onPress={onClose}>
              <Text style={{ color: theme.muted, fontSize: 14 }}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, padding: 16 }}>
            {user.chat_id.map((id) => (
              <TouchableOpacity key={id} style={overlayStyles.chatRow} activeOpacity={0.7}>
                <View style={overlayStyles.chatAvatar}>
                  <Text style={{ fontSize: 22 }}>{}</Text> {/* chat picture */}
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={overlayStyles.chatName}>{getProfileById(id).dog.dog_name}</Text>
                    {/*<Text style={overlayStyles.chatTime}>{c.}</Text> time for chat */}
                  </View>
                  {/*<Text style={overlayStyles.chatLast} numberOfLines={1}>{c.last}</Text>*/}
                </View>
                {getUnreadMessages(id).length > 0 && (
                  <View style={overlayStyles.chatBadge}>
                    <Text style={overlayStyles.chatBadgeText}>{getUnreadMessages(id).length}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <CustomSearchBar
          search={search}
          setSearch={setSearch}
          defaultText="Search for conversations..."
          searchBar={mapStyle.searchBar}
          searchInput={mapStyle.searchInput}
          searchWrap={mapStyle.searchWrap}
          />
        </Animated.View>
      </View>
    </Modal>
  );
}

export default ChatOverlay;
