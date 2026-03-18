import { useState, useRef, useCallback } from "react";
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform, StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { theme, friends, mockMessages } from "../../styles/theme";
import { chatScreenStyles as s } from "../../styles/styles";

type Message = {
  id: number;
  from: "me" | "them";
  text: string;
  time: string;
};

function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router  = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const friendId = Number(id);
  const friend   = friends.find((f) => f.id === friendId);

  const [messages, setMessages] = useState<Message[]>(
    mockMessages[friendId] ?? []
  );
  const [draft, setDraft] = useState("");

  const send = useCallback(() => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "me", text, time: getTime() },
    ]);
    setDraft("");
    // Simulate a reply after a short delay
    setTimeout(() => {
      const replies = [
        "Sounds great! 🐾",
        "Buddy will love it!",
        "Can't wait! 🐶",
        "Perfect, see you there!",
        "🐕 Woof woof!",
      ];
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "them",
          text: replies[Math.floor(Math.random() * replies.length)],
          time: getTime(),
        },
      ]);
    }, 1200);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
  }, [draft]);

  if (!friend) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.bg, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: theme.muted }}>Friend not found</Text>
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
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={{ fontSize: 16, color: theme.text }}>←</Text>
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

      {/* ── Park invite (only for going friends) ── */}
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
                <Text style={s.parkCardSub}>Today · {friend.online ? "En route" : "Scheduled"}</Text>
              </View>
            </View>
            <TouchableOpacity style={s.parkCardBtn} activeOpacity={0.8}>
              <Text style={s.parkCardBtnText}>Join them →</Text>
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
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
      >
        {/* Date stamp */}
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
        {/* Emoji / attachment */}
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