export const theme = {
  bg: "#0F1117",
  surface: "#181C27",
  surfaceUp: "#1E2335",
  border: "#252A3D",
  accent: "#F5A623",
  accentSoft: "rgba(245,166,35,0.13)",
  green: "#3DDC84",
  greenSoft: "rgba(61,220,132,0.13)",
  blue: "#4A9EFF",
  blueSoft: "rgba(74,158,255,0.13)",
  red: "#FF6B6B",
  text: "#F0F2F8",
  muted: "#7B82A0",
  card: "#1A1F30",
};

export const parks = [
  { id: 1, name: "Riverside Bark Park",   x: 38, y: 30, dogs: 7,  going: true,  time: "3:00 PM" },
  { id: 2, name: "Greenfield Off-Leash",  x: 62, y: 55, dogs: 3,  going: false, time: "5:30 PM" },
  { id: 3, name: "Sunny Meadow Dog Park", x: 25, y: 65, dogs: 12, going: false, time: "4:00 PM" },
  { id: 4, name: "Harbor Paws Arena",     x: 75, y: 25, dogs: 5,  going: false, time: "6:00 PM" },
];

export const friends = [
  { id: 1, name: "Sarah K.", dog: "Max",     breed: "Golden Retriever", online: true,  going: "Riverside Bark Park",  avatar: "🐕" },
  { id: 2, name: "Tom R.",   dog: "Bella",   breed: "Labrador",         online: true,  going: "Greenfield Off-Leash", avatar: "🐩" },
  { id: 3, name: "Mia L.",   dog: "Charlie", breed: "Beagle",           online: false, going: null,                   avatar: "🦮" },
  { id: 4, name: "Jake P.",  dog: "Luna",    breed: "Husky",            online: true,  going: "Riverside Bark Park",  avatar: "🐺" },
  { id: 5, name: "Chloe B.", dog: "Rocky",   breed: "Bulldog",          online: false, going: null,                   avatar: "🐾" },
];

export const feedItems = [
  { id: 1, user: "Sarah K.", dog: "Max",     avatar: "🐕", action: "is heading to",      place: "Riverside Bark Park",  time: "in 30 min",           img: null, likes: 14, comments: 3  },
  { id: 2, user: "Jake P.",  dog: "Luna",    avatar: "🐺", action: "just checked in at", place: "Riverside Bark Park",  time: "5 min ago",           img: "🏃", likes: 22, comments: 7  },
  { id: 3, user: "Mia L.",   dog: "Charlie", avatar: "🦮", action: "posted a photo from",place: "Sunny Meadow",         time: "2h ago",              img: "📸", likes: 41, comments: 12 },
  { id: 4, user: "Tom R.",   dog: "Bella",   avatar: "🐩", action: "will visit",          place: "Greenfield Off-Leash", time: "tomorrow at 5:30 PM", img: null, likes: 6,  comments: 1  },
];

export const achievements = [
  { id: 1, icon: "🏆", title: "Social Pup",   desc: "Visited 5 parks with friends",  progress: 100, earned: true  },
  { id: 2, icon: "🌟", title: "Early Bird",   desc: "Check in before 8 AM",          progress: 100, earned: true  },
  { id: 3, icon: "🔥", title: "7-Day Streak", desc: "Visit a park 7 days in a row",  progress: 71,  earned: false },
  { id: 4, icon: "🗺️", title: "Explorer",    desc: "Visit 10 different parks",      progress: 40,  earned: false },
  { id: 5, icon: "💬", title: "Chatterbox",   desc: "Send 50 messages to friends",   progress: 60,  earned: false },
  { id: 6, icon: "📅", title: "Planner",      desc: "Schedule 20 park visits",       progress: 85,  earned: false },
];

export const menuItems = [
  { icon: "🐾", label: "My Profile" },
  { icon: "⚙️", label: "Settings" },
  { icon: "🔔", label: "Notifications" },
  { icon: "🗓️", label: "My Schedule" },
  { icon: "🐕", label: "My Dog's Profile" },
  { icon: "❓", label: "Help & Support" },
  { icon: "🚪", label: "Sign Out" },
];

export const chatContacts = [
  { id: 1, name: "Sarah K.", dog: "Max",   avatar: "🐕", last: "See you at 3!",            unread: 2, time: "2m" },
  { id: 2, name: "Jake P.",  dog: "Luna",  avatar: "🐺", last: "Luna loves the riverside!", unread: 0, time: "1h" },
  { id: 3, name: "Tom R.",   dog: "Bella", avatar: "🐩", last: "Is Charlie coming?",        unread: 1, time: "3h" },
];

export const mockMessages: Record<number, { id: number; from: "me" | "them"; text: string; time: string }[]> = {
  1: [
    { id: 1,  from: "them", text: "Hey! Are you bringing Buddy today? 🐶",          time: "2:10 PM" },
    { id: 2,  from: "me",   text: "Yes! Heading to Riverside at 3. Max coming too?", time: "2:12 PM" },
    { id: 3,  from: "them", text: "Of course! Max has been so excited all day 😄",   time: "2:13 PM" },
    { id: 4,  from: "me",   text: "Haha same with Buddy. See you there!",            time: "2:14 PM" },
    { id: 5,  from: "them", text: "See you at 3! 🐾",                               time: "2:15 PM" },
  ],
  2: [
    { id: 1,  from: "them", text: "Luna absolutely loved the riverside last time!",  time: "Yesterday" },
    { id: 2,  from: "me",   text: "Buddy too! Should we go again this weekend?",     time: "Yesterday" },
    { id: 3,  from: "them", text: "Definitely. Saturday morning works for me 🌅",    time: "Yesterday" },
    { id: 4,  from: "me",   text: "Perfect, I'll RSVP on the app",                  time: "1h ago" },
    { id: 5,  from: "them", text: "Luna loves the riverside!",                       time: "1h ago" },
  ],
  3: [
    { id: 1,  from: "me",   text: "Hey Tom, is Charlie coming to the park?",         time: "10:00 AM" },
    { id: 2,  from: "them", text: "Is Charlie coming?",                              time: "10:05 AM" },
    { id: 3,  from: "me",   text: "Yeah I asked first 😄 Greenfield at 5:30?",       time: "10:06 AM" },
    { id: 4,  from: "them", text: "Ha! Yes we'll be there 🐩",                       time: "10:08 AM" },
  ],
  4: [
    { id: 1,  from: "them", text: "Luna says hi to Buddy 🐺",                        time: "3h ago" },
    { id: 2,  from: "me",   text: "Buddy says hi back! 🐶",                          time: "3h ago" },
  ],
  5: [
    { id: 1,  from: "them", text: "Rocky wants a playdate!",                         time: "Yesterday" },
    { id: 2,  from: "me",   text: "Buddy would love that. Which park?",              time: "Yesterday" },
  ],
};