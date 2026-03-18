import { GestureResponderEvent, TouchableOpacity, View } from "react-native";
import { shared, topBarStyles } from "../styles/styles";

type Props = {
    onPress: (event: GestureResponderEvent) => void;
}

function MenuButton({ onPress }: Props) {
    return (
        <TouchableOpacity
            style={shared.topBarBtn}
            onPress={onPress}
            activeOpacity={0.7}
            >
            <View style={{ gap: 4, alignItems: "center" }}>
                <View style={[topBarStyles.line, { width: 16 }]} />
                <View style={[topBarStyles.line, { width: 12 }]} />
                <View style={[topBarStyles.line, { width: 16 }]} />
            </View>
        </TouchableOpacity>
    );
}

export default MenuButton;