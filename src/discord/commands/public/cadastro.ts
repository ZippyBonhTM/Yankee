import { Command } from "#base";
import { ApplicationCommandType } from "discord.js";
import { cadastroModal } from "#modals";
import { db } from "#database";

new Command({
    name: "cadastrar",
    description: "Crie seu documento pessoal.",
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
        const member = await db.members.findOne({ id: interaction.member.id });
        if (member) {
            interaction.reply({
                ephemeral, content: "Você já possui um documento, não pode emitir mais de 1.",
                embeds: [], components: [] });
            return;
        }
        interaction.showModal(cadastroModal());
    }
});