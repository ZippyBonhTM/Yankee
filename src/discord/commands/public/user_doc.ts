import { ApplicationCommandType } from "discord.js";
import { Command } from "#base";
import { createEmbed, createEmbedFooter } from "@magicyan/discord";
import { settings } from "#settings";
import { db } from "#database";

new Command({
    name: "document",
    description: "Veja seu documento do Comando Alfa.",
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
        // interaction.deferReply({ ephemeral });
        const userData = await db.members.findOne({ id: interaction.member.id.toString(), guild: { id: interaction.guildId.toString() } });
        if (userData == null) {
            interaction.reply({ content: "Você ainda não tem um documento, deseja emitir um agora?" });
            return;
        }

        const embed = createEmbed({
            title: "ID - Comando Alfa",
            color: settings.colors.primary,
            footer: createEmbedFooter({
                iconURL: interaction.member.avatarURL(),
                text: "Identificação do Militar."
            }),
            fields: [
                { name: "FO", value: String(userData?.reputacao) ?? "N/A" },
                { name: "Codename", value: userData?.codename ?? "N/A" },
                { name: "BloodType", value: userData?.bloodType ?? "N/A" }
            ]
        });

        interaction.reply({ embeds: [embed] });
    }
});