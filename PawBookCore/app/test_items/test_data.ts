import { dateToCustomDate } from "../backend/helper_functions";
import { AchievementItem, ActionType, Chat, DogBreed, FeedItem, FilterType, MenuItem, Message, ParkLocation, ParkSize, Profile } from "../backend/types";

// only here to simulated a users data or backend data

export let currentUser: number = 0;

export let parks: ParkLocation[] = [
    { park_id: 1, name: "Bartók téri kutyafuttató", lat: 46.255025, lng: 20.143048, dogs_there: [], dogs_going: [1], park_size: ParkSize.MEDIUM, user_going: true},
]

export let achievements: AchievementItem[] = [
    { achievement_id: 2, icon: "🌟", title: "Early Bird", description: "Check in before 8 AM",          progression: 100, earned: true  },
    { achievement_id: 1, icon: "🏆", title: "Social Pup", description: "Visited 5 parks with friends",  progression: 100, earned: true  },
    { achievement_id: 3, icon: "🔥", title: "7-Day Streak", description: "Visit a park 7 days in a row",  progression: 71,  earned: false },
    { achievement_id: 4, icon: "🗺️", title: "Explorer", description: "Visit 10 different parks",      progression: 40,  earned: false },
    { achievement_id: 5, icon: "💬", title: "Chatterbox", description: "Send 50 messages to friends",   progression: 60,  earned: false },
    { achievement_id: 6, icon: "📅", title: "Planner",  description: "Schedule 20 park visits",       progression: 85,  earned: false },
];

export let menuItems: MenuItem[] = [
  { icon: "🐾", label: "My Profile" },
  { icon: "⚙️", label: "Settings" },
  { icon: "🔔", label: "Notifications" },
  { icon: "🗓️", label: "My Schedule" },
  { icon: "❓", label: "Help & Support" },
  { icon: "🚪", label: "Sign Out" },
];

export let mockMessages: Array<Chat> = [
    {
        chat_id: 1, messages: [
            {message_id: 1, messenger_profile_id: 1, text: "asd", time: dateToCustomDate(new Date(Date.now()))}, 
            {message_id: 2, messenger_profile_id: 2, text: "1asd", time: dateToCustomDate(new Date(Date.now()))}, 
            {message_id: 3, messenger_profile_id: 1, text: "23asd", time: dateToCustomDate(new Date(Date.now()))}, 
            {message_id: 4, messenger_profile_id: 2, text: "as42d", time: dateToCustomDate(new Date(Date.now()))}, 
        ], members_id: [1, 2], last_read_message_id: 4
    },
    {
        chat_id: 2, messages: [
            {message_id: 1, messenger_profile_id: 1, text: "asd", time: dateToCustomDate(new Date(Date.now()))}, 
            {message_id: 2, messenger_profile_id: 2, text: "d", time: dateToCustomDate(new Date(Date.now()))}, 
            {message_id: 3, messenger_profile_id: 1, text: "23dsadsaasd", time: dateToCustomDate(new Date(Date.now()))}, 
            {message_id: 4, messenger_profile_id: 2, text: "sadsadasdasdasdasdasdas", time: dateToCustomDate(new Date(Date.now()))}, 
        ], members_id: [1, 2], last_read_message_id: 4
    },
];

export const AUTO_REPLIES = [
  "Sounds great! 🐾",
  "Buddy will love it!",
  "Can't wait! 🐶",
  "Perfect, see you there!",
  "🐕 Woof woof!",
  "Awesome, see you soon!",
];

export let userbase: Profile[] = [
    { profile_id: 1, current_location: {lat: 46.262116, lng: 20.165383}, action: ActionType.AT_HOME, liked_post_id: [2, 3], chat_id: [], friend_id: [], is_online: true, dog: {dog_name: "Tappancs", dog_breed: DogBreed.SAINT_BERNARD}, owner_name: "Marci",going_park_id: [2, 1] },
    { profile_id: 2, current_location: {lat: 0, lng: 0}, action: ActionType.AT_HOME, liked_post_id: [1, 4], chat_id: [], friend_id: [], is_online: false, dog: {dog_name: "Gina", dog_breed: DogBreed.SHIBA}, owner_name: "Bogi",going_park_id: [1, 3] },
    { profile_id: 3, current_location: {lat: 0, lng: 0}, action: ActionType.AT_HOME, liked_post_id: [], chat_id: [], friend_id: [], is_online: false, dog: {dog_name: "Füge", dog_breed: DogBreed.CORGI}, owner_name: "Bence",going_park_id: [1] },
    { profile_id: 4, current_location: {lat: 0, lng: 0}, action: ActionType.AT_HOME, liked_post_id: [], chat_id: [], friend_id: [], is_online: true, dog: {dog_name: "Micike", dog_breed: DogBreed.SHIBA}, owner_name: "Olivér",going_park_id: [] },
    { profile_id: 5, current_location: {lat: 0, lng: 0}, action: ActionType.AT_HOME, liked_post_id: [], chat_id: [], friend_id: [], is_online: true, dog: {dog_name: "Anubis", dog_breed: DogBreed.SAINT_BERNARD}, owner_name: "Ati",going_park_id: [3, 2] },
]

export let feedItems: FeedItem[] = [
  {feed_item_id: 1, filter: FilterType.CHECK_IN, profile_id: 1, likes: 2, comments: 3, time: dateToCustomDate(new Date(2026, 2, 3, 19, 23, 43))},
  {feed_item_id: 2, profile_id: 1, likes: 3, comments: 3, time: dateToCustomDate(new Date(2026, 1, 1, 7, 32, 12))},
  {feed_item_id: 3, filter: FilterType.GOING_OUT, profile_id: 2, likes: 4, comments: 1, time: dateToCustomDate(new Date(2026, 1, 12, 30, 10))},
  {feed_item_id: 4, filter: FilterType.PHOTOS, profile_id: 2, likes: 2, comments: 10, time: dateToCustomDate(new Date(2025, 5, 12, 30, 10))},
  {feed_item_id: 5, filter: FilterType.PHOTOS, profile_id: 2, likes: 32, comments: 10, time: dateToCustomDate(new Date(2025, 5, 12, 30, 10))}
]

// avoid warning
export default AUTO_REPLIES;