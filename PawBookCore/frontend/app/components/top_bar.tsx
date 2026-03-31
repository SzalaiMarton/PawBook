import { GestureResponderEvent, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { topBarStyles } from "../styles/styles";
import { theme } from "../styles/theme";
import Logo from "./logo";
import MenuButton from "./menu_button";

type Props = {
    menuOnPress: (event: GestureResponderEvent) => void;
    chatOnPress: (event: GestureResponderEvent) => void;
}

function TopBar({ menuOnPress, chatOnPress }: Props) {
    return (
        <SafeAreaView style={{ backgroundColor: theme.bg }}>
            <View style={topBarStyles.bar}>
                <View style={topBarStyles.menuButton}>
                    <MenuButton onPress={menuOnPress}/>
                </View>
                <Logo/>
                {/*<View style={topBarStyles.chatButton}>
                    <ChatButton onPress={chatOnPress}/>
                </View>*/}
            </View>
        </SafeAreaView>
    );
}

export default TopBar;