import { GestureResponderEvent, ScrollView, Text, TouchableOpacity } from "react-native";
import { feedStyles } from "../styles/styles";
import { useState } from "react";
import { filterToString, FilterType } from "../backend/models";

type Props = {
    onPress: (filter: FilterType) => void;
    filter: FilterType[];
}

function Filters({onPress, filter}: Props) {
    const [activeFilter,  setActiveFilter]  = useState(filterToString(FilterType.ALL));

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={feedStyles.filters}
            >
            {filter.map((f) => (
                <TouchableOpacity
                    key={f}
                    style={activeFilter === filterToString(f) ? feedStyles.filterPillActive : feedStyles.filterPill}
                    onPress={() => {
                        setActiveFilter(filterToString(f))
                        onPress(f)
                    }}
                    activeOpacity={0.7}
                >
                <Text style={activeFilter === filterToString(f) ? feedStyles.filterTextActive : feedStyles.filterText}>
                    {filterToString(f)}
                </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

export default Filters;