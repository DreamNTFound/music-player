import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { audioMap, coverImage } from "../utils/assetLoader";

export const FeaturedTracks = [
    {
        id: 1,
        title: "Everest",
        artist: "Dream Music",
        cover: coverImage,
        audio: audioMap["everest"],
        icon: [faUser, faCalendar],
        yearAdded: "2023"
    },

    {
        id: 2,
        title: "Mask",
        artist: "Dream Music",
        cover: coverImage,
        audio: audioMap["mask"],
        icon: [faUser, faCalendar],
        yearAdded: "2021"
    },

    {
        id: 3,
        title: "Paranoid",
        artist: "Dream Music",
        cover: coverImage,
        audio: audioMap["paranoid"],
        icon: [faUser, faCalendar],
        yearAdded: "2023"
    },

    {
        id: 7,
        title: "Until I End Up Dead",
        artist: "Dream Music",
        cover: coverImage,
        audio: audioMap["until_i_end_up_dead"],
        icon: [faUser, faCalendar],
        yearAdded: "2023"
    },

    {
        id: 5,
        title: "Slow Down",
        artist: "Dream Music",
        cover: coverImage,
        audio: audioMap["slow_down"],
        icon: [faUser, faCalendar],
        yearAdded: "2023"
    },

    {
        id: 6,
        title: "Spotlight",
        artist: "Dream Music",
        cover: coverImage,
        audio: audioMap["spotlight"],
        icon: [faUser, faCalendar],
        yearAdded: "2023"
    }
]