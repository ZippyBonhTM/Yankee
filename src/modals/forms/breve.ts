import { Responder, ResponderType } from "#base";
import { db } from "#database";
import { settings } from "#settings";
import { brBuilder, createEmbed, createModalInput, createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, inlineCode, ModalBuilder, TextInputStyle } from "discord.js";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().max(70, "O campo (nome) precisa ter menos que 71 caracteres."),
    description: z.string().min(120, "O campo (descrição) precisa ter mais de 120 caracteres."),
    objectives: z.string(),
    topics: z.string()
});

type FormSchema = z.infer<typeof formSchema>;

export function breveModal(data: Partial<Record<keyof FormSchema, string>> = {}) {
    return new ModalBuilder({
        customId: "breve/make",
        title: "Criação de brevês",
        components: [
            createModalInput({
                customId: "name",
                label: "Nome do brevê",
                placeholder: "Digite o nome do brevê",
                style: TextInputStyle.Short,
                value: data.name,
                required
            }),
            createModalInput({
                customId: "description",
                label: "Descrição do brevê",
                placeholder: "Digite a descrição do brevê",
                style: TextInputStyle.Short,
                value: data.description,
                required
            }),
            createModalInput({
                customId: "objectives",
                label: "Objetivos do brevê",
                placeholder: "Digite os objetivos do brevê",
                style: TextInputStyle.Short,
                value: data.objectives,
                required
            }),
            createModalInput({
                customId: "topics",
                label: "Tópicos do brevê",
                placeholder: "Digite os tópicos do brevê",
                style: TextInputStyle.Short,
                value: data.topics,
                required
            }),
        ]
    });
};

new Responder({
    customId: "breve/make/**:data",
    type: ResponderType.Button, cache: "cached",
    async run(interaction, { data }) {
        const [name, description, objectives, topics ] = data;
        interaction.showModal(breveModal({ name, description, objectives, topics }));
    },
});

new Responder({
    customId: "breve/make",
    type: ResponderType.Modal, cache: "cached",
    async run(interaction) {
        const { fields } = interaction;

        const rawData = fields.fields.reduce(
            (prev, curr) => ({ ...prev, [curr.customId]: curr.value }), {}
        );

        const parsedResult = formSchema.safeParse(rawData);

        if (!parsedResult.success) {
            const embed = createEmbed({
                color: settings.colors.danger,
                description: brBuilder(
                    "O formulário tem campos incorretos!",
                    parsedResult.error.errors.map(err => `- ${inlineCode(err.message)}`)
                )
            });
            const row = createRow(
                new ButtonBuilder({
                    customId: `breve/make/${Object.values(rawData).join(",")}`,
                    label: "Tentar novamente",
                    style: ButtonStyle.Primary,
                })
            );

            const options = { ephemeral, embeds: [embed], components: [row] };
            if (interaction.isFromMessage()) {
                interaction.update(options);
                return;
            }
            interaction.reply(options);
            return;
        }

        const options = { ephemeral, content: "Formulário enviado.", embeds: [], components: [] };
        if (interaction.isFromMessage()) {
            const guild = await db.guilds.get(interaction.guildId);
            const breve = await db.breve.create({
                name: parsedResult.data.name,
                descripton: parsedResult.data.description,
                detalhes: {
                    objetivos: parsedResult.data.objectives,
                    topicos: parsedResult.data.topics.split(";")
                },
                guild: guild._id
            });
            await guild.updateOne().set("breves", breve._id).exec();
            interaction.update(options);
            return;
        }
        const guild = await db.guilds.get(interaction.guildId);
        const breve = await db.breve.create({
            name: parsedResult.data.name,
            descripton: parsedResult.data.description,
            detalhes: {
                objetivos: parsedResult.data.objectives,
                topicos: parsedResult.data.topics.split(";")
            },
            guild: guild._id
        });
        await guild.updateOne().set("breves", breve._id).exec();
        interaction.reply(options);
    },
});