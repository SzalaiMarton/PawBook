import { useRouter, usePathname } from "expo-router";
import { View, TouchableOpacity, Text } from "react-native";
import { theme } from "../styles/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { navStyles } from "../styles/styles";

const TABS = [
  { name: "pages/home",         path: "/(pages)/home",          icon: "◈", label: "Home"    },
  { name: "pages/friends",      path: "/(pages)/friends",       icon: "◍", label: "Friends" },
  { name: "pages/map",          path: "/(pages)/map",           icon: "◉", label: "Map",   isMap: true },
  { name: "pages/achievements", path: "/(pages)/achievements",  icon: "◆", label: "Awards" },
  { name: "pages/feed",         path: "/(pages)/feed",          icon: "◎", label: "Feed"   },
];

function BottomNav() {
  const router   = useRouter();
  const pathname = usePathname();

  return (
    <SafeAreaView style={{backgroundColor: theme.surface, }} edges={["bottom"]}>
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
    </SafeAreaView>
  );
}

export default BottomNav;