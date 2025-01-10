import { Responder, ResponderType } from "#base";
import { db } from "#database";
import { menus } from "#menus";
import { changeAluno } from "#modals";
import { settings } from "#settings";
import { createEmbed, createEmbedAuthor } from "@magicyan/discord";
import { WebhookClient } from "discord.js";

new Responder({
    customId: "stsi/breve/:menu/:id",
    type: ResponderType.Button, cache: "cached",
    async run(interaction, { menu, id }) {
        await interaction.deferUpdate();

        switch (menu) {
            case "matricula": {
                interaction.editReply(menus.stsi.breve.matricula(id));
                return;
            };
            case "remove": {
                if (!process.env.WEBHOOK_LOGS_URL) return;

                const breve = await db.breve.findByIdAndDelete(id).exec();
                
                const embed = createEmbed({
                    title: "BREVE DELETADO",
                    author: createEmbedAuthor(interaction.client.user),
                    fields: [
                        { name: "Infrator:", value: interaction.user.id, inline },
                        { name: "Breve deletado:", value: breve?.name, inline },
                        { name: "Alunos Afetados:", value: breve?.alunos.length.toString() },
                    ],
                    color: settings.colors.warning,
                });

                new WebhookClient({ url: process.env.WEBHOOK_LOGS_URL })
                .send({ embeds: [embed] })
                return;
            };
        }
    },
});

new Responder({
    customId: "stsi/:menu",
    type: ResponderType.Button, cache: "cached",
    async run(interaction, { menu }) {
        await interaction.deferUpdate();

        const { guild } = interaction;
        const guildData = await (await db.guilds.get(interaction.guildId)).populate("breves");
        const brevesIds = guildData.breves;
        let breveData = [];

        for (let i = 0; i < brevesIds.length; i++) {
            const breve = await db.breve.findById(brevesIds[i]).exec();
            if (breve) breveData.push(breve);
        }
        
        switch (menu) {
            case "main": {
                interaction.editReply(menus.stsi.main(breveData, guild));
                return;
            }
        }
    },
});

new Responder({
    customId: "aluno/edit/:id",
    type: ResponderType.Button, cache: "cached",
    async run(interaction, { id }) {
        console.log("aqui");
        interaction.showModal(changeAluno({}, id));
        return;
    },
});