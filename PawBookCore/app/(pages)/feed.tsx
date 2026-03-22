import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { theme } from "../styles/theme";
import Filters from "../components/filters";
import { FilterType, FeedItem } from "../backend/types";
import FeedCard from "../components/feed_card";
import { feedItems } from "../test_items/test_data";
import { useState, useEffect } from "react";

const FILTERS: FilterType[] = [
  FilterType.ALL, 
  FilterType.CHECK_IN,
  FilterType.GOING_OUT,
  FilterType.PHOTOS
];

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState(FilterType.ALL);
  const [activeItems, setActiveItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    getActiveItems();
  }, [activeFilter]);

  function getActiveItems() {
    let temp = []
    for (let i = 0; i < feedItems.length; i++) {
      if (activeFilter === FilterType.ALL) {
        temp.push(feedItems[i]);
      }
      else if (feedItems[i].filter !== undefined && activeFilter === feedItems[i].filter) {
        temp.push(feedItems[i]);
      }
    }
    setActiveItems(temp)
  }
  

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      <Filters filter={FILTERS} onPress={(f) => setActiveFilter(f)} />
      {activeItems.map((element) => (
        <FeedCard item={element}/>
      ))}
    </ScrollView>
  );
}
