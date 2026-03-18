import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { feedStyles } from "../styles/styles";
import { useState } from "react";

function Filters({filter}: {filter: string[]}) {
  const [activeFilter,  setActiveFilter]  = useState("All");

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={feedStyles.filters}
            >
            {filter.map((f) => (
                <TouchableOpacity
                    key={f}
                    style={activeFilter === f ? feedStyles.filterPillActive : feedStyles.filterPill}
                    onPress={() => setActiveFilter(f)}
                    activeOpacity={0.7}
                >
                <Text style={activeFilter === f ? feedStyles.filterTextActive : feedStyles.filterText}>
                    {f}
                </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

export default Filters;