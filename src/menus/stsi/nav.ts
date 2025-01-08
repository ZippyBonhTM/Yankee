import { ButtonBuilder, ButtonStyle } from "discord.js";

export const navMenu = {
    main: new ButtonBuilder({
        customId: "stsi/main",
        label: "Pagina principal",
        style: ButtonStyle.Danger
    }),
    back: (menu: string) => new ButtonBuilder({
        customId: `stsi/${menu}`,
        label: "Voltar",
        style: ButtonStyle.Danger,
    })
}