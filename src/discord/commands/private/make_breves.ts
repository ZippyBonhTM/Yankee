import { Command } from "#base";
import { ApplicationCommandType } from "discord.js";
import { breveModal } from "#modals";

new Command({
    name: "make_breve",
    description: "Exibe um modal para criar um brevê",
    dmPermission: false,
    defaultMemberPermissions: "Administrator",
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
        interaction.showModal(breveModal());
    }
});