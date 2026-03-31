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

export function dogbreedToString(breed: DogBreed | undefined) {
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

export class CustomDate {
    year: number = 0;
    month: number = 0;
    day: number = 0;
    hour: number = 0;
    minute: number = 0;
    second: number = 0;

    constructor(year: number = 0, month: number = 0, day: number = 0, hour: number = 0, minute: number = 0, second: number = 0) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }

    static create(): CustomDate {
        return new CustomDate();
    }

    withYear(year: number): CustomDate {
        this.year = year;
        return this;
    }

    withMonth(month: number): CustomDate {
        this.month = month;
        return this;
    }

    withDay(day: number): CustomDate {
        this.day = day;
        return this;
    }

    withHour(hour: number): CustomDate {
        this.hour = hour;
        return this;
    }

    withMinute(minute: number): CustomDate {
        this.minute = minute;
        return this;
    }

    withSecond(second: number): CustomDate {
        this.second = second;
        return this;
    }
}

export class Location {
    lat: number = 0;
    lng: number = 0;

    constructor(lat: number = 0, lng: number = 0) {
        this.lat = lat;
        this.lng = lng;
    }

    static create(): Location {
        return new Location();
    }

    withLat(lat: number): Location {
        this.lat = lat;
        return this;
    }

    withLng(lng: number): Location {
        this.lng = lng;
        return this;
    }
}

export class Dog {
    dog_name: string = "";
    dog_breed: DogBreed = DogBreed.NONE;

    constructor(dog_name: string = "", dog_breed: DogBreed = DogBreed.NONE) {
        this.dog_name = dog_name;
        this.dog_breed = dog_breed;
    }

    static create(): Dog {
        return new Dog();
    }

    withName(name: string): Dog {
        this.dog_name = name;
        return this;
    }

    withBreed(breed: DogBreed): Dog {
        this.dog_breed = breed;
        return this;
    }
}

export class Profile {
    profile_id: number = 0;
    friend_id: number[] = [];
    going_park_id: number[] = [];
    chat_id: number[] = [];
    liked_post_id: number[] = [];
    current_location: Location = new Location();
    is_online: boolean = false;
    dog: Dog = new Dog();
    owner_name: string = "";
    profile_picture?: string = "";
    action?: ActionType = ActionType.NONE;
    current_park?: ParkLocation | undefined = undefined;

    constructor(
        profile_id: number = 0,
        friend_id: number[] = [],
        going_park_id: number[] = [],
        chat_id: number[] = [],
        liked_post_id: number[] = [],
        current_location: Location = new Location(),
        is_online: boolean = false,
        dog: Dog = new Dog(),
        owner_name: string = "",
        action?: ActionType,
        profile_picture?: string,
        current_park?: ParkLocation
    ) {
        this.profile_id = profile_id;
        this.friend_id = friend_id;
        this.going_park_id = going_park_id;
        this.chat_id = chat_id;
        this.liked_post_id = liked_post_id;
        this.current_location = current_location;
        this.is_online = is_online;
        this.dog = dog;
        this.owner_name = owner_name;
        this.action = action;
        this.profile_picture = profile_picture;
        this.current_park = current_park;
    }

    static create(): Profile {
        return new Profile();
    }

    withProfileId(id: number): Profile {
        this.profile_id = id;
        return this;
    }

    withFriendId(ids: number[]): Profile {
        this.friend_id = ids;
        return this;
    }

    withGoingParkId(ids: number[]): Profile {
        this.going_park_id = ids;
        return this;
    }

    withChatId(ids: number[]): Profile {
        this.chat_id = ids;
        return this;
    }

    withLikedPostId(ids: number[]): Profile {
        this.liked_post_id = ids;
        return this;
    }

    withCurrentLocation(location: Location): Profile {
        this.current_location = location;
        return this;
    }

    withIsOnline(online: boolean): Profile {
        this.is_online = online;
        return this;
    }

    withDog(dog: Dog): Profile {
        this.dog = dog;
        return this;
    }

    withOwnerName(name: string): Profile {
        this.owner_name = name;
        return this;
    }

    withProfilePicture(picture: string): Profile {
        this.profile_picture = picture;
        return this;
    }

    withAction(action: ActionType): Profile {
        this.action = action;
        return this;
    }

    withCurrentPark(park: ParkLocation): Profile {
        this.current_park = park;
        return this;
    }
}

export class FeedItem {
    feed_item_id: number = 0;
    profile_id: number = 0;
    likes: number = 0;
    comments: number = 0;
    time: CustomDate = new CustomDate();
    filter?: FilterType | undefined = FilterType.NONE;
    uploaded_pictures?: string[] = [];

    constructor(
        feed_item_id: number = 0,
        profile_id: number = 0,
        likes: number = 0,
        comments: number = 0,
        time: CustomDate = new CustomDate(),
        filter?: FilterType,
        uploaded_pictures?: string[]
    ) {
        this.feed_item_id = feed_item_id;
        this.profile_id = profile_id;
        this.likes = likes;
        this.comments = comments;
        this.time = time;
        this.filter = filter;
        this.uploaded_pictures = uploaded_pictures;
    }

    static create(): FeedItem {
        return new FeedItem();
    }

    withFeedItemId(id: number): FeedItem {
        this.feed_item_id = id;
        return this;
    }

    withProfileId(id: number): FeedItem {
        this.profile_id = id;
        return this;
    }

    withLikes(likes: number): FeedItem {
        this.likes = likes;
        return this;
    }

    withComments(comments: number): FeedItem {
        this.comments = comments;
        return this;
    }

    withTime(time: CustomDate): FeedItem {
        this.time = time;
        return this;
    }

    withFilter(filter: FilterType): FeedItem {
        this.filter = filter;
        return this;
    }

    withUploadedPictures(pictures: string[]): FeedItem {
        this.uploaded_pictures = pictures;
        return this;
    }
}

export class AchievementItem {
    achievement_id: number = 0;
    progression: number = 0;
    earned: boolean = false;
    icon: string = "";
    title: string = "";
    description: string = "";

    constructor(
        achievement_id: number = 0,
        progression: number = 0,
        earned: boolean = false,
        icon: string = "",
        title: string = "",
        description: string = ""
    ) {
        this.achievement_id = achievement_id;
        this.progression = progression;
        this.earned = earned;
        this.icon = icon;
        this.title = title;
        this.description = description;
    }

    static create(): AchievementItem {
        return new AchievementItem();
    }

    withAchievementId(id: number): AchievementItem {
        this.achievement_id = id;
        return this;
    }

    withProgression(progression: number): AchievementItem {
        this.progression = progression;
        return this;
    }

    withEarned(earned: boolean): AchievementItem {
        this.earned = earned;
        return this;
    }

    withIcon(icon: string): AchievementItem {
        this.icon = icon;
        return this;
    }

    withTitle(title: string): AchievementItem {
        this.title = title;
        return this;
    }

    withDescription(description: string): AchievementItem {
        this.description = description;
        return this;
    }
}

export class MenuItem {
    icon: string = "";
    label: string = "";

    constructor(icon: string = "", label: string = "") {
        this.icon = icon;
        this.label = label;
    }

    static create(): MenuItem {
        return new MenuItem();
    }

    withIcon(icon: string): MenuItem {
        this.icon = icon;
        return this;
    }

    withLabel(label: string): MenuItem {
        this.label = label;
        return this;
    }
}

export class ParkLocation {
    park_id: number = 0;
    lat: number = 0;
    lng: number = 0;
    dogs_going: number[] = [];
    dogs_there: number[] = [];
    user_going: boolean = false;
    name: string = "";
    park_size: ParkSize | undefined = ParkSize.NONE;

    constructor(
        park_id: number = 0,
        lat: number = 0,
        lng: number = 0,
        dogs_going: number[] = [],
        dogs_there: number[] = [],
        user_going: boolean = false,
        name: string = "",
        park_size?: ParkSize
    ) {
        this.park_id = park_id;
        this.lat = lat;
        this.lng = lng;
        this.dogs_going = dogs_going;
        this.dogs_there = dogs_there;
        this.user_going = user_going;
        this.name = name;
        this.park_size = park_size;
    }

    static create(): ParkLocation {
        return new ParkLocation();
    }

    withParkId(id: number): ParkLocation {
        this.park_id = id;
        return this;
    }

    withLat(lat: number): ParkLocation {
        this.lat = lat;
        return this;
    }

    withLng(lng: number): ParkLocation {
        this.lng = lng;
        return this;
    }

    withDogsGoing(dogs: number[]): ParkLocation {
        this.dogs_going = dogs;
        return this;
    }

    withDogsThere(dogs: number[]): ParkLocation {
        this.dogs_there = dogs;
        return this;
    }

    withUserGoing(going: boolean): ParkLocation {
        this.user_going = going;
        return this;
    }

    withName(name: string): ParkLocation {
        this.name = name;
        return this;
    }

    withParkSize(size: ParkSize): ParkLocation {
        this.park_size = size;
        return this;
    }
}

export class Message {
    message_id: number = 0;
    messenger_profile_id: number = 0;
    text: string = "";
    time: CustomDate = new CustomDate();

    constructor(
        message_id: number = 0,
        messenger_profile_id: number = 0,
        text: string = "",
        time: CustomDate = new CustomDate()
    ) {
        this.message_id = message_id;
        this.messenger_profile_id = messenger_profile_id;
        this.text = text;
        this.time = time;
    }

    static create(): Message {
        return new Message();
    }

    withMessageId(id: number): Message {
        this.message_id = id;
        return this;
    }

    withMessengerProfileId(id: number): Message {
        this.messenger_profile_id = id;
        return this;
    }

    withText(text: string): Message {
        this.text = text;
        return this;
    }

    withTime(time: CustomDate): Message {
        this.time = time;
        return this;
    }
}

export class Chat {
    chat_id: number = 0;
    members_id: number[] = [];
    last_read_message_id: number = 0;
    messages: Message[] = [];

    constructor(
        chat_id: number = 0,
        members_id: number[] = [],
        last_read_message_id: number = 0,
        messages: Message[] = []
    ) {
        this.chat_id = chat_id;
        this.members_id = members_id;
        this.last_read_message_id = last_read_message_id;
        this.messages = messages;
    }

    static create(): Chat {
        return new Chat();
    }

    withChatId(id: number): Chat {
        this.chat_id = id;
        return this;
    }

    withMembersId(ids: number[]): Chat {
        this.members_id = ids;
        return this;
    }

    withLastReadMessageId(id: number): Chat {
        this.last_read_message_id = id;
        return this;
    }

    withMessages(messages: Message[]): Chat {
        this.messages = messages;
        return this;
    }
}

// avoid warning
export default Chat;
