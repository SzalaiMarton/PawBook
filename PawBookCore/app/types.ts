export enum FilterType {
    ALL,
    PHOTOS,
    GOING_OUT,
    CHECK_IN,
    NONE
}

export enum ActionType {
    GOING_OUT,
    AT_HOME,
    AT_PARK,
    PRIVATE,
    NONE
}

export enum ParkSize {
    SMALL,
    MEDIUM,
    LARGE,
    NONE
}

export enum DogBreed {
    CORGI,
    SAINT_BERNARD,
    SHIBA,
    NONE
}

export function dogbreedToString(breed: DogBreed |undefined) {
    switch (breed) {
        case DogBreed.CORGI:
            return "Corgi";
        case DogBreed.SAINT_BERNARD:
            return "Saint Bernard";
        case DogBreed.SHIBA:
            return "Shiba";
        default:
            return "Not specified";
    }
}

export function parksizeToString(size: ParkSize | undefined) {
    switch (size) {
        case ParkSize.SMALL:
            return "Small";
        case ParkSize.MEDIUM:
            return "Medium";
        case ParkSize.LARGE:
            return "Large";
        default:
            return "Not specified";
    }
}

export function actionToString(type: ActionType | undefined) {
    switch (type) {
        case ActionType.AT_HOME:
            return "At home";
        case ActionType.GOING_OUT:
            return "Going out";
        case ActionType.AT_PARK:
            return "At park";
        case ActionType.PRIVATE:
            return "Private";
        default:
            return "Not specified";
    }
}

export function filterToString(type: FilterType | undefined) {
    switch (type) {
        case FilterType.CHECK_IN:
            return "Check-in";
        case FilterType.GOING_OUT:
            return "Going out";
        case FilterType.PHOTOS:
            return "Photos";
        case FilterType.ALL:
            return "All";
        default:
            return "Not specified";
    }
}

export type Profile = {
    profile_id: number;
    friend_id: number[];
    going_park_id: number[];
    chat_id: number[];
    is_online: boolean;
    dog: Dog;
    owner_name: string;
    profile_picture?: string; // path to picture i guess
    action?: ActionType;
    current_park?: ParkLocation | undefined;
}

export type Dog = {
    dog_name: string;
    dog_breed: DogBreed;
}

export type FeedItem = {
    feed_item_id: number;
    profile_id: number;
    likes: number;
    comments: number;
    time: CustomDate;
    filter?: FilterType;
    uploaded_pictures?: string[]; 
}

export type AchievementItem = {
    achievement_id: number;
    progression: number;
    earned: boolean;
    icon: string;
    title: string;
    description: string;
}

export type MenuItem = {
    icon: string;
    label: string;
}

export type ParkLocation = {
    park_id: number;
    x: number;
    y: number;
    dogs_going: number[]; // profile ids
    user_going: boolean;
    name: string;
    park_size: ParkSize | undefined;
}

export type Message = {
    message_id: number;
    messenger_profile_id: number;
    text: string;
    time: CustomDate;
}

export type Chat = {
    chat_id: number;
    members_id: number[];
    last_read_message_id: number;
    messages: Message[];
}

export type CustomDate = {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
};

// avoid warning
export default Chat;