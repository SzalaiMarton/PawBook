import { GestureResponderEvent, View } from "react-native";
import { topBarStyles } from "../styles/styles";
import { theme } from "../styles/theme";
import ChatButton from "./chat_button";
import Logo from "./logo";
import MenuButton from "./menu_button";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReactNode } from "react";

type Props = {
    menuOnPress: (event: GestureResponderEvent) => void;
    chatOnPress: (event: GestureResponderEvent) => void;
}

function TopBar({ menuOnPress, chatOnPress }: Props) {
    return (
        <SafeAreaView style={{ backgroundColor: theme.bg }}>
            <View style={topBarStyles.bar}>
            <MenuButton onPress={menuOnPress}/>
            <Logo/>
            <ChatButton onPress={chatOnPress}/>
            </View>
        </SafeAreaView>
    );
}

export default TopBar;