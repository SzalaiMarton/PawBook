import { Text, View } from "react-native";
import getParkById from "../backend/helper_functions";
import { Profile } from "../backend/models";
import { dashStyles, shared } from "../styles/styles";
import theme from "../styles/theme";

function TodayPlan({user}: {user: Profile}) {
    const park = getParkById(user.going_park_id.at(0));
    return (
        <View style={dashStyles.todayCard}>
            <Text style={dashStyles.todayLabel}>Today's Plan</Text>
            <View style={dashStyles.todayInner}>
                <View style={dashStyles.todayIcon}>
                <Text style={{ fontSize: 24 }}>🏞️</Text>
                </View>
                <View>
                <Text style={dashStyles.todayTitle}>{park.name}</Text>
                <Text style={dashStyles.todaySub}>Today at 3:00 PM · {park.dogs_going} dogs attending</Text>
                </View>
            </View>
            <View style={dashStyles.todayTags}> {/* **TODO** fetch dogs that attend to this park */}
                {["🐕 Sarah", "🐺 Jake", "+5"].map((tag) => (
                <View
                    key={tag}
                    style={[shared.card, { paddingHorizontal: 11, paddingVertical: 5, backgroundColor: theme.surface }]}
                >
                    <Text style={{ fontSize: 12, color: theme.text }}>{tag}</Text>
                </View>
                ))}
            </View>
        </View>
    );
}

export default TodayPlan;