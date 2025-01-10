import { Command } from "#base";
import { BreveSchema, db } from "#database";
import { menus } from "#menus";
import { ApplicationCommandType } from "discord.js";
import { BreveSchemaType } from "menus/stsi/main.js";

new Command({
    name: "stsi",
    description: "Sistema de Treinamento e Simulação Integrada (STSI)",
    dmPermission: false,
    defaultMemberPermissions: "CreateEvents",
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
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
    }
});