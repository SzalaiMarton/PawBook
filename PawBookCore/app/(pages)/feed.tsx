import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { theme } from "../styles/theme";
import Filters from "../components/filters";
import { FeedItem, FilterType } from "../types";
import FeedCard from "../components/feed_card";
import { dateToCustomDate } from "../helper_functions";

const FILTERS: FilterType[] = [
  FilterType.ALL, 
  FilterType.CHECK_IN,
  FilterType.GOING_OUT,
  FilterType.PHOTOS
];
const feedItems: FeedItem[] = [
  {feed_item_id: 1, profile_id: 1, likes: 2, comments: 3, time: dateToCustomDate(new Date(2026, 4, 3))},
  {feed_item_id: 2, profile_id: 3, likes: 3, comments: 3, time: dateToCustomDate(new Date(2026, 4, 3))},
  {feed_item_id: 3, profile_id: 2, likes: 4, comments: 1, time: dateToCustomDate(new Date(2026, 4, 3))},
  {feed_item_id: 4, profile_id: 4, likes: 2, comments: 10, time: dateToCustomDate(new Date(2026, 4, 3))}
]

export default function FeedPage() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      <Filters filter={FILTERS}/>
      {feedItems.map((element) => (
        <FeedCard item={element}/>
      ))}
    </ScrollView>
  );
}
