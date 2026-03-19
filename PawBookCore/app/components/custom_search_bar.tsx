import { View, Text } from "react-native";
import { shared } from "../styles/styles";

function CustomSearchBar() {
    return (
        <View style={[shared.searchBar, { marginBottom: 20 }]}>
            <Text style={{ fontSize: 16 }}>🔍</Text>
            <Text style={shared.searchPlaceholder}>Find dog friends...</Text>
        </View>
    );
}

export default CustomSearchBar;