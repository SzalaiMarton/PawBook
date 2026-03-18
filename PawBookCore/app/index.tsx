import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "./styles/theme";

export default function NotFound() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.paw}>🐾</Text>
      <Text style={styles.code}>404</Text>
      <Text style={styles.title}>Lost in the dog park?</Text>
      <Text style={styles.sub}>
        This page doesn't exist. Buddy probably buried it somewhere.
      </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.replace("/(pages)/home" as any)}
        activeOpacity={0.8}
      >
        <Text style={styles.btnText}>Take me home 🏠</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  paw: {
    fontSize: 64,
    marginBottom: 16,
    opacity: 0.4,
  },
  code: {
    fontSize: 72,
    fontWeight: "700",
    color: theme.accent,
    letterSpacing: -2,
    lineHeight: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.text,
    marginTop: 8,
    marginBottom: 12,
    textAlign: "center",
  },
  sub: {
    fontSize: 14,
    color: theme.muted,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  btn: {
    backgroundColor: theme.accent,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 16,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
  },
});