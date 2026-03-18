import { useState } from "react";
import { TouchableOpacity, Text, View, GestureResponderEvent } from "react-native";
import { shared } from "../styles/styles";
import { topBarStyles } from "../styles/styles";

type Props = {
    onPress: (event: GestureResponderEvent) => void;
}

function ChatButton({ onPress }: Props) {
    return (
        <>
            <TouchableOpacity
                style={shared.topBarBtn}
                activeOpacity={0.7}
                onPress={onPress}
                >
                <Text style={{ fontSize: 18 }}>💬</Text>
                <View style={topBarStyles.chatBadge} />
            </TouchableOpacity>
        </>
    )
}

export default ChatButton;