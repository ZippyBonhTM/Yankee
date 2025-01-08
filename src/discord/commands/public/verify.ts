import { Command } from "#base";
import { settings } from "#settings";
import { createEmbed, createRow } from "@magicyan/discord";
import { ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle } from "discord.js";
import noblox from "noblox.js";

new Command({
    name: "verify",
    description: "verifique com seu roblox e tenha acesso livre ao servidor.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "id_do_roblox",
            description: "id do seu perfil do roblox.",
            type: ApplicationCommandOptionType.Number,
            required: true
        }
    ],
    async run(interaction) {
        try {
            await interaction.deferReply({ ephemeral });
            const { options } = interaction;
            const robloxProfileId = options.getNumber("id_do_roblox", true);

            const robloxProfile = await noblox.getPlayerInfo(robloxProfileId);
            const playerThumbnail = await noblox.getPlayerThumbnail(robloxProfileId, "720x720", "png", false, "body");

            const embed = createEmbed   ({
                title: "Este é seu perfil?",
                color: settings.colors.azoxo,
                description: "Confime se este é seu perfil do roblox.",
                fields: [
                    { name: "Username:", value: robloxProfile.username },
                    { name: "DisplayName:", value: robloxProfile.displayName },
                    { name: "Idade:", value: robloxProfile.age?.toString()??"N/A" }
                ],
                thumbnail: playerThumbnail[0].imageUrl
            });

            const row = createRow(
                new ButtonBuilder({
                    customId: `verify/confirm/${robloxProfile.username}`,
                    label: "Confirmar",
                    style: ButtonStyle.Primary
                })
            );
            interaction.editReply({ embeds: [embed], components: [row] });
        } catch (erro) {
            const embed = createEmbed({
                title: `Error no comando.`,
                description: "`" + erro + "`",
                color: settings.colors.warning,
            });
            interaction.editReply({ embeds: [embed], components: [] });
        }

    }
});