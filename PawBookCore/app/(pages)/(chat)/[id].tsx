import { useState, useRef, useEffect, useCallback } from "react";
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { theme } from "../../styles/theme";
import { chatScreenStyles } from "../../styles/styles";
import { mockMessages } from "@/app/test_items/test_data";
import { dateToCustomDate, getParkById, getProfileById, getProfilePicture } from "@/app/helper_functions";
import { AUTO_REPLIES } from "@/app/test_items/test_data";
import { Message } from "@/app/types";
import { currentUser } from "@/app/test_items/test_data";
import MessageCard from "@/app/components/message_card";

function getTime() {
  return new Date();
}

export default function ChatScreen() {
  const user = getProfileById(currentUser)
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const friendId = user.friend_id.find((f) => f === Number(id));
  const friend = getProfileById(friendId);

  if (friendId === undefined) {
    return;
  }

  // Key state to `friendId` so it fully resets when navigating between chats
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft]       = useState("");
  const [joined, setJoined]     = useState(false);

  // Reset everything whenever the friend changes
  useEffect(() => {
    const chat = mockMessages.find(c => c.chat_id === friendId);
    setMessages([]);
    setDraft("");
    setJoined(false);
    // Small delay lets the list mount before scrolling
    const t = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: false }), 100);
    return () => clearTimeout(t);
  }, [friendId]);

  const send = useCallback(() => {
    const text = draft.trim();
    if (!text) return;
    const outgoing: Message = { message_id: Date.now(), messenger_profile_id: user.profile_id, text, time: dateToCustomDate(new Date(Date.now())) };
    setMessages((prev) => [...prev, outgoing]);
    setDraft("");
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);

    // Auto-reply
    const replyTimer = setTimeout(() => {
      const reply: Message = {
        message_id: Date.now() + 1,
        messenger_profile_id: friendId,
        text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
        time: dateToCustomDate(new Date(Date.now())),
      };
      setMessages((prev) => [...prev, reply]);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);
    }, 1200);

    return () => clearTimeout(replyTimer);
  }, [draft]);

  const handleJoin = useCallback(() => {
    if (joined || !friend.going_park_id || (friend.going_park_id && friend.going_park_id.length < 0)) return;
    setJoined(true);
    const park = getParkById(friend.going_park_id.at(0)).name;
    const confirmMsg: Message = {
      message_id: Date.now(),
      messenger_profile_id: user.profile_id,
      text: `Just RSVP'd to ${park} — see you there! 🐾`,
      time: dateToCustomDate(new Date(Date.now())),
    };
    setMessages((prev) => [...prev, confirmMsg]);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);

    setTimeout(() => {
      const replyMsg: Message = {
        message_id: Date.now() + 1,
        messenger_profile_id: friendId,
        text: `Yay!! Can't wait to see you and Buddy 🐶🎉`,
        time: dateToCustomDate(new Date(Date.now())),
      };
      setMessages((prev) => [...prev, replyMsg]);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);
    }, 1000);
  }, [joined, friend]);

  // Always navigate back to friends tab, not the previous history entry
  const goBack = () => router.replace("/(pages)/friends" as any);

  if (!friend) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.bg, alignItems: "center", justifyContent: "center", gap: 16 }}>
        <Text style={{ fontSize: 48 }}>🐾</Text>
        <Text style={{ color: theme.text, fontSize: 18, fontWeight: "700" }}>Friend not found</Text>
        <TouchableOpacity
          style={{ backgroundColor: theme.accent, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 14 }}
          onPress={goBack}
          activeOpacity={0.8}
        >
          <Text style={{ fontWeight: "700", color: "#000" }}>Back to Friends</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={chatScreenStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      {/* ── Header ── */}
      <View style={chatScreenStyles.header}>
        <TouchableOpacity style={chatScreenStyles.backBtn} onPress={goBack} activeOpacity={0.7}>
          <Text style={{ fontSize: 18, color: theme.text }}>←</Text>
        </TouchableOpacity>

        <View style={chatScreenStyles.headerAvatar}>
          <Text style={{ fontSize: 22 }}>{getProfilePicture(friend)}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={chatScreenStyles.headerName}>{friend.dog.dog_name}</Text>
          <Text style={friend.is_online ? chatScreenStyles.headerOnline : chatScreenStyles.headerSub}>
            {friend.is_online ? "● Online" : "Offline"}
          </Text>
        </View>

        <View style={chatScreenStyles.headerRight}>
          <TouchableOpacity style={chatScreenStyles.headerIconBtn} activeOpacity={0.7}>
            <Text style={{ fontSize: 16 }}>📍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={chatScreenStyles.headerIconBtn} activeOpacity={0.7}>
            <Text style={{ fontSize: 16 }}>⋯</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Park invite card ── */}
      {friend.going_park_id && friend.going_park_id?.length > 0 ? (
        <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
          <View style={chatScreenStyles.parkCard}>
            <Text style={chatScreenStyles.parkCardLabel}>🏃 Heading to a park</Text>
            <View style={chatScreenStyles.parkCardRow}>
              <View style={chatScreenStyles.parkCardIcon}>
                <Text style={{ fontSize: 20 }}>🌳</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={chatScreenStyles.parkCardName}>{getParkById(friend.going_park_id.at(0)).name}</Text>
                <Text style={chatScreenStyles.parkCardSub}>
                  Today · {friend.is_online ? "En route" : "Scheduled"}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[chatScreenStyles.parkCardBtn, joined && chatScreenStyles.parkCardBtnJoined]}
              onPress={handleJoin}
              activeOpacity={joined ? 1 : 0.8}
              disabled={joined}
            >
              <Text style={[chatScreenStyles.parkCardBtnText, joined && chatScreenStyles.parkCardBtnTextJoined]}>
                {joined ? "✓ You're going!" : "Join them →"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : 
      <></>
      }

      {/* ── Messages ── */}
      <ScrollView
        ref={scrollRef}
        style={chatScreenStyles.messagesList}
        contentContainerStyle={chatScreenStyles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={chatScreenStyles.dateDivider}>
          <Text style={chatScreenStyles.dateDividerText}>Today</Text>
        </View>

        {messages.map((msg) => (
          <MessageCard props={{msg, friend}}/>
        ))}
      </ScrollView>

      {/* ── Input bar ── */}
      <View style={chatScreenStyles.inputBar}>
        <TouchableOpacity
          style={[chatScreenStyles.sendBtnDisabled, { backgroundColor: theme.surfaceUp }]}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 18 }}>🐾</Text>
        </TouchableOpacity>

        <View style={chatScreenStyles.inputWrap}>
          <TextInput
            style={chatScreenStyles.inputText}
            placeholder="Message..."
            placeholderTextColor={theme.muted}
            value={draft}
            onChangeText={setDraft}
            multiline
            returnKeyType="send"
            onSubmitEditing={send}
            blurOnSubmit={false}
          />
        </View>

        <TouchableOpacity
          style={draft.trim() ? chatScreenStyles.sendBtn : chatScreenStyles.sendBtnDisabled}
          onPress={send}
          activeOpacity={0.8}
          disabled={!draft.trim()}
        >
          <Text style={{ fontSize: 18 }}>{draft.trim() ? "➤" : "🎙️"}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}