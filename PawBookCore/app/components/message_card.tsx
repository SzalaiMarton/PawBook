import { View, Text } from "react-native";
import { dateToCustomDate, getProfileById, getProfilePicture } from "../helper_functions";
import { currentUser } from "../test_items/test_data";
import { Message, Profile } from "../types";
import { chatScreenStyles } from "../styles/styles";

type Props = {
    msg: Message;
    friend: Profile;
}

function MessageCard({props}: {props: Props}) {
    const user = getProfileById(currentUser)

    function displayTime(msg: Message) {
        const currDate = dateToCustomDate(new Date(Date.now()));
        if (msg.time.year !== currDate.year) {
        return `${msg.time.year.toString()} ${msg.time.month.toString()} ${msg.time.day.toString()}`
        }
        else if (msg.time.day !== currDate.day) {
        return `${msg.time.month.toString()} ${msg.time.day.toString()}`
        }
        else {
        return `${msg.time.hour.toString()} ${msg.time.minute.toString()}`
        }
    }

    return (
        <View key={props.msg.message_id} style={props.msg.messenger_profile_id === user.profile_id ? chatScreenStyles.bubbleRowMe : chatScreenStyles.bubbleRow}>
            {props.msg.messenger_profile_id === props.friend.profile_id && (
                <View style={chatScreenStyles.bubbleAvatar}>
                <Text style={{ fontSize: 14 }}>{getProfilePicture(props.friend)}</Text>
                </View>
            )}
            <View style={props.msg.messenger_profile_id === user.profile_id ? chatScreenStyles.bubbleMe : chatScreenStyles.bubbleThem}>
                <Text style={props.msg.messenger_profile_id === user.profile_id ? chatScreenStyles.bubbleTextMe : chatScreenStyles.bubbleTextThem}>
                {props.msg.text}
                </Text>
                <Text style={props.msg.messenger_profile_id === user.profile_id ? chatScreenStyles.bubbleTimeMe : chatScreenStyles.bubbleTime}>
                {displayTime(props.msg)}
                </Text>
            </View>
        </View>
    );
}

export default MessageCard;
