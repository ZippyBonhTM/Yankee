import { BreveSchema } from "#database";
import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { User } from "discord.js";
import { alunoBreveType } from "discord/components/menus/stsi/selects.js";
import { stsiMenu } from "./index.js";

// FAZER UM MODAL COM ZOD PARA UM BOTÃO DE EDIÇÃO DOS DADOS DO ALUNO

export function stsiAlunoMenu(breveData: BreveSchema, alunoData: alunoBreveType ,member: User) {
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
       stsiMenu.nav.main
    );

    return { ephemeral, embeds: [embed], components: [navRow] };
}