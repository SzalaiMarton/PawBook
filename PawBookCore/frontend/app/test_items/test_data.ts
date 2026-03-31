import { dateToCustomDate } from "../backend/helper_functions";
import { AchievementItem, ActionType, Chat, Dog, DogBreed, FeedItem, FilterType, Location, MenuItem, Message, ParkLocation, ParkSize, Profile } from "../backend/models";

// only here to simulated a users data or backend data

export let currentUser: number = 0;

export let parks: ParkLocation[] = [
    new ParkLocation(1, 46.255025, 20.143048, [1], [], true, "Bartók téri kutyafuttató", ParkSize.MEDIUM),
]

export let achievements: AchievementItem[] = [
    new AchievementItem(2, 100, true, "🌟", "Early Bird", "Check in before 8 AM"),
    new AchievementItem(1, 100, true, "🏆", "Social Pup", "Visited 5 parks with friends"),
    new AchievementItem(3, 71, false, "🔥", "7-Day Streak", "Visit a park 7 days in a row"),
    new AchievementItem(4, 40, false, "🗺️", "Explorer", "Visit 10 different parks"),
    new AchievementItem(5, 60, false, "💬", "Chatterbox", "Send 50 messages to friends"),
    new AchievementItem(6, 85, false, "📅", "Planner", "Schedule 20 park visits"),
];

export let menuItems: MenuItem[] = [
  new MenuItem("🐾", "My Profile"),
  new MenuItem("⚙️", "Settings"),
  new MenuItem("🔔", "Notifications"),
  new MenuItem("🗓️", "My Schedule"),
  new MenuItem("❓", "Help & Support"),
  new MenuItem("🚪", "Sign Out"),
];

export let mockMessages: Array<Chat> = [
    new Chat(1, [1, 2], 4, [
        new Message(1, 1, "asd", dateToCustomDate(new Date(Date.now()))),
        new Message(2, 2, "1asd", dateToCustomDate(new Date(Date.now()))),
        new Message(3, 1, "23asd", dateToCustomDate(new Date(Date.now()))),
        new Message(4, 2, "as42d", dateToCustomDate(new Date(Date.now()))),
    ]),
    new Chat(2, [1, 2], 4, [
        new Message(1, 1, "asd", dateToCustomDate(new Date(Date.now()))),
        new Message(2, 2, "d", dateToCustomDate(new Date(Date.now()))),
        new Message(3, 1, "23dsadsaasd", dateToCustomDate(new Date(Date.now()))),
        new Message(4, 2, "sadsadasdasdasdasdasdas", dateToCustomDate(new Date(Date.now()))),
    ]),
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
    new Profile(1, [], [2, 1], [], [2, 3], new Location(46.262116, 20.165383), true, new Dog("Tappancs", DogBreed.SAINT_BERNARD), "Marci", ActionType.AT_HOME),
    new Profile(2, [], [1, 3], [], [1, 4], new Location(0, 0), false, new Dog("Gina", DogBreed.SHIBA), "Bogi", ActionType.AT_HOME),
    new Profile(3, [], [1], [], [], new Location(0, 0), false, new Dog("Füge", DogBreed.CORGI), "Bence", ActionType.AT_HOME),
    new Profile(4, [], [], [], [], new Location(0, 0), true, new Dog("Micike", DogBreed.SHIBA), "Olivér", ActionType.AT_HOME),
    new Profile(5, [], [3, 2], [], [], new Location(0, 0), true, new Dog("Anubis", DogBreed.SAINT_BERNARD), "Ati", ActionType.AT_HOME),
]

export let feedItems: FeedItem[] = [
  new FeedItem(1, 1, 2, 3, dateToCustomDate(new Date(2026, 2, 3, 19, 23, 43)), FilterType.CHECK_IN),
  new FeedItem(2, 1, 3, 3, dateToCustomDate(new Date(2026, 1, 1, 7, 32, 12))),
  new FeedItem(3, 2, 4, 1, dateToCustomDate(new Date(2026, 1, 12, 30, 10)), FilterType.GOING_OUT),
  new FeedItem(4, 2, 2, 10, dateToCustomDate(new Date(2025, 5, 12, 30, 10)), FilterType.PHOTOS),
  new FeedItem(5, 2, 32, 10, dateToCustomDate(new Date(2025, 5, 12, 30, 10)), FilterType.PHOTOS),
]

// avoid warning
export default AUTO_REPLIES;