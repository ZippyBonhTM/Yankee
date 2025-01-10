import { Responder, ResponderType } from "#base";
import { db } from "#database";
import { settings } from "#settings";
import { brBuilder, createEmbed, createModalInput, createRow, isNumeric } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, inlineCode, ModalBuilder, TextInputStyle } from "discord.js";
import { z } from "zod";

const formSchema = z.object({
    done: z.string().refine(
        (arg) => ["true", "false"].includes(arg),
        { message: 'O campo (Está formado?) não foi escrito corretamente. Precisa ser entre "Sim" e "Nâo"' }
    ),
    pontos: z.string().refine(
        (arg)  => isNumeric(arg),
        { message: "O campo (pontos) está incorreto. precisa ser de 1 - 10." }
    )
});

type FormSchema = z.infer<typeof formSchema>;

export function changeAluno(data: Partial<Record<keyof FormSchema, string>> = {}, breveId: string) {
    return new ModalBuilder({
        customId: `aluno/change/${breveId}`,
        title: "Modifique as informações do aluno",
        components: [
            createModalInput({
                customId: "done",
                label: "Finalização",
                placeholder: "Está formado?",
                style: TextInputStyle.Short,
                value: data.done,
                required
            }),
            createModalInput({
                customId: "pontos",
                label: "Pontos",
                placeholder: "Quantos pontos o aluno possui?",
                style: TextInputStyle.Short,
                value: data.pontos,
                required
            })
        ]
    });
};

new Responder({
    customId: "aluno/change/:id/**:data",
    type: ResponderType.Button, cache: "cached",
    async run(interaction, { id, data }) {
        const [ done, pontos ] = data;
        interaction.showModal(changeAluno({ done, pontos }, id));
    },
});

new Responder({
    customId: "aluno/change/:id",
    type: ResponderType.Modal, cache: "cached",
    async run(interaction, { id }) {
        const { fields } = interaction;
        
        const rawData = fields.fields.reduce(
            (prev, curr) => ({ ...prev, [curr.customId]: curr.value }), {}
        );

        const parsedResult = formSchema.safeParse(rawData);
        console.log(parsedResult);


        if (!parsedResult.success) {
            const embed = createEmbed({
                color: settings.colors.danger,
                description: brBuilder(
                    "O formulário têm campos incorretos!",
                    parsedResult.error.errors.map(err => `- ${inlineCode(err.message)}`)
                )
            });
            
            const row = createRow(
                new ButtonBuilder({
                    customId: `aluno/change/${id}/${Object.values(rawData).join(",")}`,
                    label: "Tentar novamente",
                    style: ButtonStyle.Primary,
                })
            );

            const options = { ephemeral, embeds: [embed], components: [row] };
            if (interaction.isFromMessage()) {
                interaction.update(options);
                return;
            };
            interaction.reply(options);
            return;
        };
        const options = { ephemeral, content: "Formulário enviado.", embeds: [], components: [] };
        if (interaction.isFromMessage()) {
            const member = await db.members.findOne({ id: interaction.member.id }).populate("breves").exec();
            if (!member) return;

            const breve = member.breves.find((breve) => breve.breve?.toString() === id);
            if (!breve) return;

            breve.done = parsedResult.data.done === "false" ? false : true;
            breve.pontos = parseInt(parsedResult.data.pontos);
            member.save();

            interaction.update(options);
            return;
        }
        const member = await db.members.findOne({ id: interaction.member.id }).populate("breves").exec();
        if (!member) return;
        
        const breve = member.breves.find((breve) => breve._id.toString() === id);
        if (!breve) return;

        breve.done = parsedResult.data.done === "false" ? false : true;
        breve.pontos = parseInt(parsedResult.data.pontos);

        member.save();
        interaction.reply(options);
        return;
    },
});