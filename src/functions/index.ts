import { channelMention } from "discord.js";

// export functions here
export function formatedChannelMention(id: string | null | undefined, alt: string) {
    if (id) {
        return channelMention(id);
    };
    return alt;
};