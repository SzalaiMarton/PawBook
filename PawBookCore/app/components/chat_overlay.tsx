import { useRef, useEffect, useState } from "react";
import { Animated, Modal, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { overlayStyles, shared } from "../styles/styles";
import { theme, chatContacts } from "../styles/theme";

function ChatOverlay({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const slideX = useRef(new Animated.Value(300)).current;
  const [isMounted, setMounted] = useState(visible);

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
            {chatContacts.map((c) => (
              <TouchableOpacity key={c.id} style={overlayStyles.chatRow} activeOpacity={0.7}>
                <View style={overlayStyles.chatAvatar}>
                  <Text style={{ fontSize: 22 }}>{c.avatar}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={overlayStyles.chatName}>{c.name}</Text>
                    <Text style={overlayStyles.chatTime}>{c.time}</Text>
                  </View>
                  <Text style={overlayStyles.chatLast} numberOfLines={1}>{c.last}</Text>
                </View>
                {c.unread > 0 && (
                  <View style={overlayStyles.chatBadge}>
                    <Text style={overlayStyles.chatBadgeText}>{c.unread}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View style={overlayStyles.chatSearchWrap}>
            <View style={shared.searchBar}>
              <Text style={{ fontSize: 16 }}>🔍</Text>
              <Text style={shared.searchPlaceholder}>Search conversations...</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

export default ChatOverlay;
