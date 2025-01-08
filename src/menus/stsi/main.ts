import { BreveSchema } from "#database";
import { settings } from "#settings";
import { createEmbed, createRow } from "@magicyan/discord";
import { Guild, StringSelectMenuBuilder } from "discord.js";
import { Types } from "mongoose";

export type BreveSchemaType = {
    _id: Types.ObjectId
}

export function stsiMainMenu(breveData: Array<BreveSchema & BreveSchemaType>, guild: Guild) {
    const embed = createEmbed({
        title: "Sistema de Treinamento e Simulação Integrada (STSI)",
        color: settings.colors.primary,
        description: "Este sistema é projetado para oferecer uma plataforma unificada de treinamento e simulação, permitindo que ambos os ramos das Forças Armadas utilizem as mesmas ferramentas e recursos para melhorar a eficiência e a eficácia dos treinamentos.",
        thumbnail: guild.iconURL(),
    })

    const row = createRow(
        new StringSelectMenuBuilder({
            customId: "stsi/breve/breve/_",
            placeholder: "Análise de brevê",
            options: breveData.map((breve) => { return { label: breve.name, value: breve._id.toString() } })
        })
    )

    return { ephemeral, embeds: [embed], components: [row] }
}