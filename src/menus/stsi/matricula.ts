import { menus } from "#menus";
import { settings } from "#settings";
import { createEmbed, createRow } from "@magicyan/discord";
import {  UserSelectMenuBuilder } from "discord.js";

export function stsiMatriculaMenu(breveId: string) {
    const embed = createEmbed({
        title: "Matricule um novo aluno",
        color: settings.colors.yellow
    });

    const navRow = createRow(
        menus.stsi.nav.main
    );

    const row = createRow(
        new UserSelectMenuBuilder({
            customId: `stsi/breve/matricula/${breveId}`,
            placeholder: "Selecione um Usuário",
            max_values: 1
        })
    );

    return { ephemeral, embeds: [embed], components: [row, navRow] };
}