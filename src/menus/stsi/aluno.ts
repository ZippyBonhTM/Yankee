import { BreveSchema } from "#database";
import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, User } from "discord.js";
import { alunoBreveType } from "discord/components/menus/stsi/selects.js";
import { stsiMenu } from "./index.js";
import { BreveSchemaType } from "./main.js";

export function stsiAlunoMenu(breveData: BreveSchema & BreveSchemaType, alunoData: alunoBreveType, member: User) {
    const embed = createEmbed({
        description: brBuilder(
            "DADOS DO ALUNO",
            `Breve: ${breveData.name}`
        ),
        color: settings.colors.success,
        thumbnail: member.avatarURL(),
        fields: [
            { name: "Concluido:", value: alunoData.done ? "Sim" : "Não" },
            { name: "Pontos:", value: alunoData.pontos.toString(), inline },
        ]
    });

    const navRow = createRow(
       stsiMenu.nav.main,
       new ButtonBuilder({
        customId: `aluno/edit/${breveData._id.toString()}`,
        label: "Editar",
        style: ButtonStyle.Primary,
        }),
    );

    return { ephemeral, embeds: [embed], components: [navRow] };
}