import { dateToCustomDate } from "../helper_functions";
import { AchievementItem, Chat, DogBreed, MenuItem, Message, ParkLocation, ParkSize, Profile } from "../types";

// only here to simulated a users data or backend data

export var currentUser: number = 0;

export var parks: ParkLocation[] = [
    { park_id: 1, name: "Riverside Bark Park",   x: 38, y: 30, dogs_going: [], park_size: ParkSize.MEDIUM, user_going: true},
    { park_id: 2, name: "Greenfield Off-Leash",  x: 62, y: 55, dogs_going: [], park_size: ParkSize.SMALL , user_going: false},
    { park_id: 3, name: "Sunny Meadow Dog Park", x: 25, y: 65, dogs_going: [],park_size: ParkSize.LARGE , user_going: true},
    { park_id: 4, name: "Harbor Paws Arena",     x: 75, y: 25, dogs_going: [], park_size: ParkSize.MEDIUM , user_going: false},
]

export var achievements: AchievementItem[] = [
    { achievement_id: 2, icon: "🌟", title: "Early Bird", description: "Check in before 8 AM",          progression: 100, earned: true  },
    { achievement_id: 1, icon: "🏆", title: "Social Pup", description: "Visited 5 parks with friends",  progression: 100, earned: true  },
    { achievement_id: 3, icon: "🔥", title: "7-Day Streak", description: "Visit a park 7 days in a row",  progression: 71,  earned: false },
    { achievement_id: 4, icon: "🗺️", title: "Explorer", description: "Visit 10 different parks",      progression: 40,  earned: false },
    { achievement_id: 5, icon: "💬", title: "Chatterbox", description: "Send 50 messages to friends",   progression: 60,  earned: false },
    { achievement_id: 6, icon: "📅", title: "Planner",  description: "Schedule 20 park visits",       progression: 85,  earned: false },
];

export var menuItems: MenuItem[] = [
  { icon: "🐾", label: "My Profile" },
  { icon: "⚙️", label: "Settings" },
  { icon: "🔔", label: "Notifications" },
  { icon: "🗓️", label: "My Schedule" },
  { icon: "❓", label: "Help & Support" },
  { icon: "🚪", label: "Sign Out" },
];

export var mockMessages: Array<Chat> = [
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

export const userbase: Profile[] = [
    { profile_id: 1, chat_id: [], friend_id: [], is_online: true, dog: {dog_name: "Tappancs", dog_breed: DogBreed.SAINT_BERNARD}, owner_name: "Marci",going_park_id: [2, 1] },
    { profile_id: 2, chat_id: [], friend_id: [], is_online: false, dog: {dog_name: "Gina", dog_breed: DogBreed.SHIBA}, owner_name: "Bogi",going_park_id: [1, 3] },
    { profile_id: 3, chat_id: [], friend_id: [], is_online: false, dog: {dog_name: "Füge", dog_breed: DogBreed.CORGI}, owner_name: "Bence",going_park_id: [1] },
    { profile_id: 4, chat_id: [], friend_id: [], is_online: true, dog: {dog_name: "Micike", dog_breed: DogBreed.SHIBA}, owner_name: "Olivér",going_park_id: [] },
    { profile_id: 5, chat_id: [], friend_id: [], is_online: true, dog: {dog_name: "Anubis", dog_breed: DogBreed.SAINT_BERNARD}, owner_name: "Ati",going_park_id: [3, 2] },
]

// avoid warning
export default AUTO_REPLIES;