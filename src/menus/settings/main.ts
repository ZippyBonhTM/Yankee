import { settings } from "#settings";
import { createEmbed, createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, Guild } from "discord.js";

export function settingsMainMenu(guild: Guild) {
    const embed = createEmbed({
        color: settings.colors.primary,
        title: "Painel de configurações",
        description: "Escolha oque quer configurar",
        thumbnail: guild.iconURL(),
        footer: { iconURL: guild.iconURL(), text: `by ${guild.name}` },
    });
    
    const menuRow = createRow(
        new ButtonBuilder({
            customId: "menu/settings/channels",
            label: "Canais",
            style: ButtonStyle.Primary
        })
    )

    return { ephemeral, embeds: [embed], components: [menuRow] }
}