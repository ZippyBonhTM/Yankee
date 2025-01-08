import { Command } from "#base";
import { ApplicationCommandType } from "discord.js";

new Command({
    name: "profile",
    description: "Veja seu perfil.",
    type: ApplicationCommandType.ChatInput,
    run(interaction) {
        interaction.reply({ ephemeral, content: `aqui: ${interaction.user.avatarURL()}`})
    }
})