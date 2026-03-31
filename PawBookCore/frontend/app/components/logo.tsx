import { Text, View } from "react-native";
import { topBarStyles } from "../styles/styles";
import { theme } from "../styles/theme";

function Logo() {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={{ fontSize: 22 }}>🐾</Text>
            <Text style={topBarStyles.logoText}>
                Paw<Text style={{ color: theme.accent }}>Book</Text>
            </Text>
        </View>
    );
}

export default Logo;