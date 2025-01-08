import { Responder, ResponderType } from "#base";
import { settings } from "#settings";
import { createEmbed } from "@magicyan/discord";

new Responder({
    customId: "verify/confirm/:robloxuser",
    type: ResponderType.Button,
    cache: "cached",
    async run(interaction, { robloxuser }) {
        await interaction.member.roles.add("1025220325014765659");
        await interaction.member.edit({ nick: `${robloxuser}` });
        const embed = createEmbed({
            description: `Você foi verificado(a) com ${robloxuser}!`,
            color: settings.colors.azoxo
        });
        interaction.update({ embeds: [embed], components: [] });
    },
})