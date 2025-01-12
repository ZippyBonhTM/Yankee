import { Command } from "#base";
import { db } from "#database";
import { settings } from "#settings";
import { createEmbed } from "@magicyan/discord";

new Command({
    name: "show_document",
    description: "Mostra seu documento.",
    dmPermission: true,
    async run(interaction) {
        const { user } = interaction;

        const memberDocument = await db.members.findOne({ id: user.id }).exec();
        if (!memberDocument) {
            interaction.reply({ ephemeral, content: "Você ainda não emitiu seu documento. Utilize /make_breve para criar um.", embeds: [], components: [] });
            return;
        } else {
            const embed = createEmbed({
                title: "Carteira de Serviço Militar",
                color: settings.colors.green,
                description: "É com este documento que consegue ser matriculado no STSI e outros sitemas de treinamento e simulação. Para você analisar seus breves, precisa ser consultado no STSI.",
                fields: [
                    { name: "Codenome:", value: memberDocument.codename, inline },
                    { name: "Tipo Sanguíneo:", value: memberDocument.bloodType, inline },
                    { name: "Qnt. breves:", value: memberDocument.breves.length.toString() },
                ]
            });

            interaction.reply({ ephemeral, content: "", embeds: [embed], components: [] });
            return;
        };
    },
});