import { Responder, ResponderType } from "#base";
import { db } from "#database";
import { settings } from "#settings";
import { brBuilder, createEmbed, createModalInput, createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, inlineCode, TextInputStyle } from "discord.js";
import { ModalBuilder } from "discord.js";
import { z } from "zod";

const formSchema = z.object({
    codename: z.string().max(12, "O campo (codenome) precisa ter menos que 13 caracteres."),
    bloodtype: z.string().refine(
        (arg) => ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(arg),
        { message: "O tipo sanguíneo fornecido é inválido." }
    ),
});

type FormSchema = z.infer<typeof formSchema>;

export function cadastroModal(data: Partial<Record<keyof FormSchema, string>> = {}) {
    return new ModalBuilder({
        customId: "member/cadastre",
        title: "Criação de brevês",
        components: [
            createModalInput({
                customId: "codename",
                label: "Codenome",
                placeholder: "Digite seu codenome",
                style: TextInputStyle.Short,
                value: data.codename,
                required
            }),
            createModalInput({
                customId: "bloodtype",
                label: "Tipo sanguíneo",
                placeholder: "Digite seu tipo sanguíneo",
                style: TextInputStyle.Short,
                value: data.bloodtype,
                required
            })
        ]
    })
}

new Responder({
    customId: "member/cadastre/**:data",
    type: ResponderType.Button, cache: "cached",
    async run(interaction, { data }) {
        const [ codename, bloodtype ] = data;
        interaction.showModal(cadastroModal({ codename, bloodtype }));
    },
});

new Responder({
    customId: "member/cadastre",
    type: ResponderType.Modal, cache: "cached",
    async run(interaction) {
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
                    customId: `member/cadastre/${Object.values(rawData).join(",")}`,
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
            await db.members.create({
                id: interaction.member.id,
                guildId: interaction.guildId,
                codename: parsedResult.data.codename,
                bloodType: parsedResult.data.bloodtype
            })
            interaction.update(options);
            return;
        }
        await db.members.create({
            id: interaction.member.id,
            guildId: interaction.guildId,
            codename: parsedResult.data.codename,
            bloodType: parsedResult.data.bloodtype
        })
        interaction.reply(options);
        return;
    }
})