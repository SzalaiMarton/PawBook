import { Text, View } from "react-native";
import { getProfileById, getProfilePicture } from "../backend/helper_functions";
import { overlayStyles } from "../styles/styles";

type Props = {
    profileId: number;
}

function ProfilePicture(props: Props) {
    const currUser = getProfileById(props.profileId);
    return (
        <View style={overlayStyles.menuProfileAvatar}>
            <Text style={{ fontSize: 24 }}>{getProfilePicture(currUser)}</Text>
        </View>
    );
}

export default ProfilePicture;