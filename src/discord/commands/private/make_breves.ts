import { Command } from "#base";
import { ApplicationCommandType } from "discord.js";
import { breveModal } from "#modals";

new Command({
    name: "make_breve",
    description: "Exibe um modal para criar um brevê",
    dmPermission: false,
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
        const isInstructor = interaction.member.roles.cache.get("1327017887000432640");
        if (isInstructor) {
            interaction.showModal(breveModal());
        } else {
            interaction.reply({ ephemeral, content: "Você precisa ser um instrutor para usar esse comando" });
        }
    }
});