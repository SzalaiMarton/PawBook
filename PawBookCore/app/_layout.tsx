import { useState, useEffect, useRef } from "react";
import { Tabs, useRouter, usePathname } from "expo-router";
import {
  View, Text, TouchableOpacity, Modal, Animated,
  StatusBar, StyleSheet, Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme, menuItems, chatContacts } from "./styles/theme";
import { overlayStyles, shared } from "./styles/styles";

// ── Bottom Tab Bar ──────────────────────────────────────────────
const TABS = [
  { name: "pages/home",    path: "/(pages)/home",     icon: "◈", label: "Home"    },
  { name: "pages/friends",      path: "/(pages)/friends",       icon: "◍", label: "Friends" },
  { name: "pages/map",          path: "/(pages)/map",           icon: "◉", label: "Map",   isMap: true },
  { name: "pages/achievements", path: "/(pages)/achievements",  icon: "◆", label: "Awards" },
  { name: "pages/feed",         path: "/(pages)/feed",          icon: "◎", label: "Feed"   },
];

function BottomNav() {
  const router   = useRouter();
  const pathname = usePathname();

  return (
    <View style={navStyles.bar}>
      {TABS.map((tab) => {
        const isActive =
          tab.path === "/"
            ? pathname === "/" || pathname === "/index"
            : pathname.startsWith(tab.path);

        if (tab.isMap) {
          return (
            <TouchableOpacity
              key={tab.name}
              style={[navStyles.tab, navStyles.mapTab]}
              onPress={() => router.push(tab.path as any)}
              activeOpacity={0.7}
            >
              <View style={[navStyles.mapIconWrap, isActive && navStyles.mapIconWrapActive]}>
                <Text style={[navStyles.icon, navStyles.mapIcon, isActive && navStyles.iconActive]}>
                  {tab.icon}
                </Text>
              </View>
              <Text style={[navStyles.label, isActive && navStyles.labelActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={tab.name}
            style={[navStyles.tab, isActive && navStyles.tabActive]}
            onPress={() => router.push(tab.path as any)}
            activeOpacity={0.7}
          >
            <Text style={[navStyles.icon, isActive && navStyles.iconActive]}>{tab.icon}</Text>
            <Text style={[navStyles.label, isActive && navStyles.labelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ── Menu Overlay ────────────────────────────────────────────────
function MenuOverlay({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const slideX = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    Animated.spring(slideX, {
      toValue: visible ? 0 : -300,
      useNativeDriver: true,
      tension: 80, friction: 12,
    }).start();
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal transparent animationType="none" visible={visible} onRequestClose={onClose}>
      <View style={StyleSheet.absoluteFill}>
        <TouchableOpacity style={overlayStyles.backdrop} onPress={onClose} activeOpacity={1} />
        <Animated.View style={[overlayStyles.menuPanel, { transform: [{ translateX: slideX }] }]}>
          {/* Profile */}
          <View style={overlayStyles.menuProfileCard}>
            <View style={overlayStyles.menuProfileAvatar}>
              <Text style={{ fontSize: 24 }}>🐾</Text>
            </View>
            <View>
              <Text style={overlayStyles.menuProfileName}>Alex Johnson</Text>
              <Text style={overlayStyles.menuProfileSub}>with Buddy 🐶</Text>
            </View>
          </View>

          {/* Items */}
          {menuItems.map((item, i) => (
            <View key={item.label}>
              {i === 6 && <View style={overlayStyles.menuDivider} />}
              <TouchableOpacity style={overlayStyles.menuItem} activeOpacity={0.7}>
                <Text style={{ fontSize: 18 }}>{item.icon}</Text>
                <Text style={i === 6 ? overlayStyles.menuItemDanger : overlayStyles.menuItemText}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            </View>
          ))}

          <Text style={overlayStyles.menuFooter}>PawPlan v1.0.0 · Made with 🐾</Text>
        </Animated.View>
      </View>
    </Modal>
  );
}

// ── Chat Overlay ────────────────────────────────────────────────
function ChatOverlay({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const slideX = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.spring(slideX, {
      toValue: visible ? 0 : 300,
      useNativeDriver: true,
      tension: 80, friction: 12,
    }).start();
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal transparent animationType="none" visible={visible} onRequestClose={onClose}>
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

// ── Root Layout ─────────────────────────────────────────────────
export default function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <StatusBar barStyle="light-content" backgroundColor={theme.bg} />

      {/* Top Bar */}
      <SafeAreaView style={{ backgroundColor: theme.bg }}>
        <View style={topBarStyles.bar}>
          {/* Hamburger */}
          <TouchableOpacity
            style={shared.topBarBtn}
            onPress={() => { setMenuOpen(true); setChatOpen(false); }}
            activeOpacity={0.7}
          >
            <View style={{ gap: 4, alignItems: "center" }}>
              <View style={[topBarStyles.line, { width: 16 }]} />
              <View style={[topBarStyles.line, { width: 12 }]} />
              <View style={[topBarStyles.line, { width: 16 }]} />
            </View>
          </TouchableOpacity>

          {/* Logo */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={{ fontSize: 22 }}>🐾</Text>
            <Text style={topBarStyles.logoText}>
              Paw<Text style={{ color: theme.accent }}>Plan</Text>
            </Text>
          </View>

          {/* Chat */}
          <TouchableOpacity
            style={shared.topBarBtn}
            onPress={() => { setChatOpen(true); setMenuOpen(false); }}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 18 }}>💬</Text>
            <View style={topBarStyles.chatBadge} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Pages */}
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}
        />
      </View>

      {/* Custom Bottom Nav */}
      <BottomNav />

      {/* Overlays */}
      <MenuOverlay visible={menuOpen} onClose={() => setMenuOpen(false)} />
      <ChatOverlay visible={chatOpen} onClose={() => setChatOpen(false)} />
    </View>
  );
}

const navStyles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    height: 72,
    backgroundColor: theme.surface,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    paddingHorizontal: 6,
  },
  tab: {
    flex: 1, height: 56,
    alignItems: "center", justifyContent: "center",
    gap: 3, borderRadius: 14,
  },
  tabActive: { backgroundColor: "rgba(245,166,35,0.13)" },
  mapTab:    { flex: 1.4, alignItems: "center", justifyContent: "center", gap: 3 },
  mapIconWrap: {
    width: 50, height: 50, borderRadius: 16,
    backgroundColor: theme.surfaceUp,
    borderWidth: 1.5, borderColor: theme.border,
    alignItems: "center", justifyContent: "center",
    marginBottom: 2,
  },
  mapIconWrapActive: {
    backgroundColor: "rgba(245,166,35,0.18)",
    borderColor: "rgba(245,166,35,0.5)",
    transform: [{ translateY: -4 }],
    shadowColor: theme.accent,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  mapIcon:   { fontSize: 24 },
  icon:      { fontSize: 18, color: theme.muted },
  iconActive:{ color: theme.accent },
  label:     { fontSize: 10, fontWeight: "600", letterSpacing: 0.3, color: theme.muted },
  labelActive: { color: theme.accent },
});

const topBarStyles = StyleSheet.create({
  bar: {
    height: 56, flexDirection: "row",
    alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: theme.bg,
    borderBottomWidth: 1, borderBottomColor: theme.border,
  },
  logoText: { fontWeight: "700", fontSize: 20, color: theme.text, letterSpacing: -0.5 },
  line:     { height: 2, backgroundColor: theme.text, borderRadius: 2 },
  chatBadge:{
    position: "absolute", top: 6, right: 6,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: theme.accent,
    borderWidth: 2, borderColor: theme.bg,
  },
});
