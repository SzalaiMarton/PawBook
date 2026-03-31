import { Tabs } from "expo-router";
import { useState } from "react";
import { StatusBar, View } from "react-native";
import BottomNav from "./components/bottom_nav";
import ChatOverlay from "./components/chat_overlay";
import MenuOverlay from "./components/menu_overlay";
import TopBar from "./components/top_bar";
import { theme } from "./styles/theme";

export default function RootLayout() {
  const [chatOpen, setChatOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg,  }}>
      <StatusBar barStyle="light-content" backgroundColor={theme.bg} />

      <TopBar 
        menuOnPress={() => {setChatOpen(false); setMenuOpen(true)}}
        chatOnPress={() => {setChatOpen(true); setMenuOpen(false)}}
      />
      {/* Pages */}
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}
        />
      </View>

      <BottomNav />
      <MenuOverlay visible={menuOpen} onClose={() => setMenuOpen(false)} />
      <ChatOverlay visible={chatOpen} onClose={() => setChatOpen(false)} />
    </View>
  );
}
