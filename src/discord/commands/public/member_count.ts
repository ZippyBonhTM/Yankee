import { Command } from "#base";
import { settings } from "#settings";
import { createEmbed } from "@magicyan/discord";
import { ApplicationCommandType } from "discord.js";

new Command({
    name: "member_count",
    description: "Contagem dos membros.",
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
        const memberCount = interaction.guild.memberCount;
        const embed = createEmbed({
            title: `A contagem está em: ${memberCount}`,
            color: settings.colors.balance,
        });
        interaction.reply({ ephemeral, embeds: [embed] });
    }
});