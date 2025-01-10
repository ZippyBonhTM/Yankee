import { BreveSchema } from "#database";
import { menus } from "#menus";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord"; 
import { ButtonBuilder, ButtonStyle, UserSelectMenuBuilder } from "discord.js";
import { BreveSchemaType } from "./main.js";

export function stsiBreveMainMenu(breveData: BreveSchema & BreveSchemaType ) {
    const embed = createEmbed({
        description: brBuilder(
            "DADOS DO BREVE",
        ),
        fields: [
            { name: "Nome:", value: breveData.name },
            { name: "Descrição:", value: breveData.descripton },
            { name: "Objetivos:", value: breveData.detalhes?.objetivos },
            { name: "Tópicos:", value: breveData.detalhes?.topicos.join("; ") },
            { name: "Qnt. de Alunos:", value: breveData.alunos.length.toString() },
         ]
    });

    const row = createRow(
        new ButtonBuilder({
            customId: `stsi/breve/matricula/${breveData._id.toString()}`,
            label: "Matricular",
            style: ButtonStyle.Primary
        }),
        // new ButtonBuilder({
        //     customId: `stsi/breve/remove/${breveData._id.toString()}`,
        //     label: "Deletar Brevê",
        //     style: ButtonStyle.Danger
        // })
    );
    
    const firstRow = createRow(
        new UserSelectMenuBuilder({
            customId: `stsi/breve/user/${breveData._id.toString()}`,
            placeholder: "Consulte um usuário.",
            maxValues: 1,
        })
    );

    const navRow = createRow(
        menus.stsi.nav.main
    );

    return { ephemeral, embeds: [embed], components: [firstRow, row, navRow] };
}