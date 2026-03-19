import { currentUser, mockMessages, parks, userbase } from "./test_items/test_data";
import Chat, { ActionType, CustomDate, DogBreed, Message, ParkLocation, ParkSize, Profile } from "./types";

export function getProfilePicture(profile: Profile) {
    if (profile.profile_picture) {
        return profile.profile_picture
    }
    else {
        return "🐶";
    }
}

export function getLocation(profile: Profile | undefined) {
    if (profile === undefined) {
        return "Not specified";
    }

    if (profile.current_park && profile.action && profile.action !== ActionType.PRIVATE) {
        return profile.current_park.name;
    }
    else if (!profile.current_park && profile.action && profile.action !== ActionType.PRIVATE) {
        return "At home";
    }
    return "Not specified";
}

export function getUserParks(profile: Profile) {
    if (profile.going_park_id === undefined) {
        return [];
    }
    else {
        return profile.going_park_id;
    }
}

export function dateToCustomDate(date: Date): CustomDate {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // months are 0-based
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
}

export function getParkById(id: number | undefined): ParkLocation {
    if (id !== undefined) {
        var temp = parks.at(id);
        if (temp) {
            return temp;
        }
    }
    //return a not found park
    return { park_id: 0, name: "NotFoundPark", x: 0, y: 0, dogs_going: [], park_size: ParkSize.MEDIUM, user_going: false};
}

export function getProfileById(id: number | undefined): Profile {
    if (id !== undefined) {
        var temp = userbase.at(id);
        if (temp) {
            return temp;
        }
    }
    //return a not found park
    return { profile_id: 0, chat_id: [], friend_id: [], is_online: false, dog: {dog_name: "-", dog_breed: DogBreed.NONE}, owner_name: "-", going_park_id: [] };
}

export function getChatById(id: number | undefined): Chat {
    if (id !== undefined) {
        var temp = mockMessages.at(id);
        if (temp) {
            return temp;
        }
    }
    //return a not found park
    return {chat_id: 0, messages: [], members_id: [], last_read_message_id: 0};
}

export function getUnreadMessages(chatId: number | undefined) : [number, Message] {
    const chat = getChatById(chatId);
    var count = 0;
    var lastMessage: Message = { message_id: 0, messenger_profile_id: 0, text: "", time: dateToCustomDate(new Date())};
    for (let i = chat.messages.length - 1; i > -1; i--) {
        var c = chat.messages.at(i);
        if (c !== undefined && c.message_id === chatId) {
            lastMessage = c;
            break;
        }
        count += 1;
    }
    return [count, lastMessage];
}

// avoid warning
export default getParkById;