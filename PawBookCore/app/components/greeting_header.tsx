import { View, Text } from "react-native";
import { dashStyles } from "../styles/styles";
import { currentUser } from "../test_items/test_data";
import { dateToCustomDate, getProfileById } from "../helper_functions";

function GreetingHeader() {
    const user = getProfileById(currentUser);
    function greetMessage(): string {
        const currTime = dateToCustomDate(new Date(Date.now()));
        if (currTime.hour > 14 && currTime.hour <= 18) {
            return "Good afternoon,";
        }
        else if (currTime.hour > 18 || currTime.hour <= 5) {
            return "Good night,";
        }
        else if (currTime.hour > 5 && currTime.hour <= 9) {
            return "Good morning,";
        }
        else if (currTime.hour > 9 && currTime.hour <= 14) {
            return "Welcome,"
        }
        return "Welcome,"
    }

    return (
        <View>
            <Text style={dashStyles.greetingSub}>{greetMessage()}</Text>
            <Text style={dashStyles.greetingMain}> {user.owner_name} &amp; {user.dog.dog_name} 👋</Text>
        </View>
    );
}

export default GreetingHeader;