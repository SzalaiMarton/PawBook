import { useState, useRef, useEffect, useCallback } from "react";
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { theme, friends, mockMessages, parks } from "../../styles/theme";
import { chatScreenStyles as s } from "../../styles/styles";

type Message = {
  id: number;
  from: "me" | "them";
  text: string;
  time: string;
};

const AUTO_REPLIES = [
  "Sounds great! 🐾",
  "Buddy will love it!",
  "Can't wait! 🐶",
  "Perfect, see you there!",
  "🐕 Woof woof!",
  "Awesome, see you soon!",
];

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatScreen() {
  const { id }   = useLocalSearchParams<{ id: string }>();
  const router   = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const friendId = Number(id);
  const friend   = friends.find((f) => f.id === friendId);

  // Key state to `friendId` so it fully resets when navigating between chats
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft]       = useState("");
  const [joined, setJoined]     = useState(false);

  // Reset everything whenever the friend changes
  useEffect(() => {
    setMessages(mockMessages[friendId] ? [...mockMessages[friendId]] : []);
    setDraft("");
    setJoined(false);
    // Small delay lets the list mount before scrolling
    const t = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: false }), 100);
    return () => clearTimeout(t);
  }, [friendId]);

  const send = useCallback(() => {
    const text = draft.trim();
    if (!text) return;
    const outgoing: Message = { id: Date.now(), from: "me", text, time: getTime() };
    setMessages((prev) => [...prev, outgoing]);
    setDraft("");
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);

    // Auto-reply
    const replyTimer = setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        from: "them",
        text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
        time: getTime(),
      };
      setMessages((prev) => [...prev, reply]);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);
    }, 1200);

    return () => clearTimeout(replyTimer);
  }, [draft]);

  const handleJoin = useCallback(() => {
    if (joined || !friend?.going) return;
    setJoined(true);
    const park = friend.going;
    const confirmMsg: Message = {
      id: Date.now(),
      from: "me",
      text: `Just RSVP'd to ${park} — see you there! 🐾`,
      time: getTime(),
    };
    setMessages((prev) => [...prev, confirmMsg]);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);

    setTimeout(() => {
      const replyMsg: Message = {
        id: Date.now() + 1,
        from: "them",
        text: `Yay!! Can't wait to see you and Buddy 🐶🎉`,
        time: getTime(),
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
      style={s.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      {/* ── Header ── */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={goBack} activeOpacity={0.7}>
          <Text style={{ fontSize: 18, color: theme.text }}>←</Text>
        </TouchableOpacity>

        <View style={s.headerAvatar}>
          <Text style={{ fontSize: 22 }}>{friend.avatar}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={s.headerName}>{friend.name}</Text>
          <Text style={friend.online ? s.headerOnline : s.headerSub}>
            {friend.online ? "● Online" : "Offline"} · {friend.dog}
          </Text>
        </View>

        <View style={s.headerRight}>
          <TouchableOpacity style={s.headerIconBtn} activeOpacity={0.7}>
            <Text style={{ fontSize: 16 }}>📍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.headerIconBtn} activeOpacity={0.7}>
            <Text style={{ fontSize: 16 }}>⋯</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Park invite card ── */}
      {friend.going && (
        <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
          <View style={s.parkCard}>
            <Text style={s.parkCardLabel}>🏃 Heading to a park</Text>
            <View style={s.parkCardRow}>
              <View style={s.parkCardIcon}>
                <Text style={{ fontSize: 20 }}>🌳</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.parkCardName}>{friend.going}</Text>
                <Text style={s.parkCardSub}>
                  Today · {friend.online ? "En route" : "Scheduled"}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[s.parkCardBtn, joined && s.parkCardBtnJoined]}
              onPress={handleJoin}
              activeOpacity={joined ? 1 : 0.8}
              disabled={joined}
            >
              <Text style={[s.parkCardBtnText, joined && s.parkCardBtnTextJoined]}>
                {joined ? "✓ You're going!" : "Join them →"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ── Messages ── */}
      <ScrollView
        ref={scrollRef}
        style={s.messagesList}
        contentContainerStyle={s.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.dateDivider}>
          <Text style={s.dateDividerText}>Today</Text>
        </View>

        {messages.map((msg) => (
          <View key={msg.id} style={msg.from === "me" ? s.bubbleRowMe : s.bubbleRow}>
            {msg.from === "them" && (
              <View style={s.bubbleAvatar}>
                <Text style={{ fontSize: 14 }}>{friend.avatar}</Text>
              </View>
            )}
            <View style={msg.from === "me" ? s.bubbleMe : s.bubbleThem}>
              <Text style={msg.from === "me" ? s.bubbleTextMe : s.bubbleTextThem}>
                {msg.text}
              </Text>
              <Text style={msg.from === "me" ? s.bubbleTimeMe : s.bubbleTime}>
                {msg.time}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* ── Input bar ── */}
      <View style={s.inputBar}>
        <TouchableOpacity
          style={[s.sendBtnDisabled, { backgroundColor: theme.surfaceUp }]}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 18 }}>🐾</Text>
        </TouchableOpacity>

        <View style={s.inputWrap}>
          <TextInput
            style={s.inputText}
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
          style={draft.trim() ? s.sendBtn : s.sendBtnDisabled}
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