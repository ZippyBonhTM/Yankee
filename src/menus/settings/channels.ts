import { GuildSchema } from "#database";
import { formatedChannelMention } from "#functions";
import { menus } from "#menus";
import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { ChannelSelectMenuBuilder, ChannelType, Guild, StringSelectMenuBuilder } from "discord.js";
import { settingsMenu } from "./index.js";

export const settingsChannelsOptions = [
    { emoji: "💬", label: "chat geral", value: "general", description: "Chat geral de conversas" },
    { emoji: "🤖", label: "logs", value: "logs", description: "Chat logs do bot" }
] as const;

export function settingsChannelsMenu(guildData: GuildSchema, guild: Guild) {
    const channels = guildData.channels??{};

    const display = settingsChannelsOptions.map(({ emoji, label, value }) => 
    `- ${emoji} ${label} ${formatedChannelMention(channels[value]?.id, "`N/A`")}`
    );

    const embed = createEmbed({
        color: settings.colors.primary,
        title: "Selecione o canal que deseja configurar",
        description: brBuilder(
            display
        ),
        footer: { iconURL: guild.iconURL(), text: `by ${guild.name}` }
    });

    const selectRow = createRow(
        new StringSelectMenuBuilder({
            customId: "menu/settings/channels/select",
            placeholder: "Selecione o canal",
            options: Array.from(settingsChannelsOptions)
        })
    )

    const navRow = createRow(
        menus.settings.nav.main
    );
    
    return { ephemeral, embeds: [embed], components: [selectRow, navRow] }
}

export function settingsChannelMenu(guildData: GuildSchema, selected: string) {
    const channels = (guildData.channels?? {}) as Record<string, { id: string }>;
    
    const { emoji, label } = settingsChannelsOptions.find(({ value }) => value === selected)!;

    const embed = createEmbed({
        color: settings.colors.warning,
        description: brBuilder(
            `Alterar o canal ${emoji} ${label}`,
            `Atual: ${formatedChannelMention(channels[selected]?.id, "`N/A`")}`
        )
    });

    const selectRow = createRow(
        new ChannelSelectMenuBuilder({
            customId: `menu/settings/channel/${selected}`,
            placeholder: "Selecione o canal que deseja definir",
            channel_types: [ChannelType.GuildText]
        })
    )

    const navRow = createRow(
        settingsMenu.nav.back("channels"),
        settingsMenu.nav.main
    )

    return { ephemeral, embeds: [embed], components: [selectRow, navRow] }
}