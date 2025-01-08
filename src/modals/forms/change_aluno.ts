import { Responder, ResponderType } from "#base";
import { createModalInput } from "@magicyan/discord";
import { ModalBuilder, TextInputStyle } from "discord.js";
import { z } from "zod";

const formSchema = z.object({
    done: z.boolean(),
    pontos: z.number()
});

type FormSchema = z.infer<typeof formSchema>;

export function changeAluno(data: Partial<Record<keyof FormSchema, string>> = {}) {
    return new ModalBuilder({
        customId: "aluno/change",
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
    })
}

new Responder({
    customId: "aluno/change/**:data",
    type: ResponderType.Button, cache: "cached",
    async run(interaction, { data }) {
        const [ done, pontos ] = data;
        interaction.showModal(changeAluno({ done, pontos }));
    },
});
