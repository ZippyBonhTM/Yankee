import { Command } from "#base";
import { BreveSchema, db } from "#database";
import { menus } from "#menus";
import { ApplicationCommandType } from "discord.js";
import { BreveSchemaType } from "menus/stsi/main.js";

new Command({
    name: "stsi",
    description: "Sistema de Treinamento e Simulação Integrada (STSI)",
    dmPermission: false,
    type: ApplicationCommandType.ChatInput,
    async run(interaction){const isInstructor = interaction.member.roles.cache.get("1327017887000432640");
        if (isInstructor) {
            const { guild } = interaction;
            const guildData = await db.guilds.get(guild.id);
            const brevesData: Array<BreveSchema & BreveSchemaType> = [];
            for (let i = 0; i < guildData.breves.length; i++) {
                let breve = await db.breve.findById(guildData.breves[i]).populate("alunos").exec();
                if (breve) {
                    brevesData.push(breve);
                };
            };
    
            interaction.reply(menus.stsi.main(brevesData, guild));
        } else {
            interaction.reply({ ephemeral, content: "Você precisa ser um instrutor para usar esse comando" });
        };
    }
});