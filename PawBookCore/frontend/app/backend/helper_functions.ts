import { feedItems, mockMessages, parks, userbase } from "../test_items/test_data";
import Chat, { ActionType, CustomDate, Dog, DogBreed, FeedItem, Location, Message, ParkLocation, ParkSize, Profile } from "./models";

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
  return new CustomDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );
}

export function getParkById(id: number | undefined): ParkLocation {
    if (id !== undefined) {
        let temp = parks.at(id);
        if (temp) {
            return temp;
        }
    }
    //return a not found park
    return new ParkLocation(0, 0, 0, [], [], false, "NotFoundPark", ParkSize.MEDIUM);
}

export function getProfileById(id: number | undefined): Profile {
    if (id !== undefined) {
        let temp = userbase.at(id);
        if (temp) {
            return temp;
        }
    }
    //return a not found profile
    return new Profile(0, [], [], [], [], new Location(0, 0), false, new Dog("-", DogBreed.NONE), "-");
}

export function getChatById(id: number | undefined): Chat {
    if (id !== undefined) {
        let temp = mockMessages.at(id);
        if (temp) {
            return temp;
        }
    }
    //return a not found chat
    return new Chat();
}

export function getFeedItemById(id: number | undefined) {
    if (id !== undefined) {
        let temp = feedItems.at(id);
        if (temp) {
            return temp;
        }
    }
    //return a not found feeditem
    return new FeedItem(0, 0, 0, 0, dateToCustomDate(new Date()));
}

export function getUnreadMessages(chatId: number | undefined) : [number, Message] {
    const chat = getChatById(chatId);
    let count = 0;
    let lastMessage: Message = new Message(0, 0, "", dateToCustomDate(new Date()));
    for (let i = chat.messages.length - 1; i > -1; i--) {
        let c = chat.messages.at(i);
        if (c !== undefined && c.message_id === chatId) {
            lastMessage = c;
            break;
        }
        count += 1;
    }
    return [count, lastMessage];
}

export function timeElapsed(time: CustomDate): string {
    const currTime = dateToCustomDate(new Date(Date.now()));
    const elapsed = [
        Math.abs(currTime.year - time.year),
        Math.abs(currTime.month - time.month),
        Math.abs(currTime.day - time.day),
        Math.abs(currTime.hour - time.hour),
        Math.abs(currTime.minute - time.minute),
        Math.abs(currTime.second - time.second),
    ]
    let res = ""
    let i = 0
    while (i < elapsed.length) {
        if (elapsed[i] != 0) {
            res = String(elapsed[i]);
            break;
        }
        i += 1
    }
    if (res !== "") {
        if (i == 0) { return res += " year(s) ago."; }
        else if (i == 1) { return res += " month(s) ago."; }
        else if (i == 2) { return res += " day(s) ago."; }
        else if (i == 3) { return res += " hour(s) ago."; }
        else if (i == 4) { return res += " minute(s) ago."; }
        else { return res += " second(s) ago."; }
    }

    return "just now.";
}

// avoid warning
export default getParkById;