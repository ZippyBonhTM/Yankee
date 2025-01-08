import { ButtonBuilder, ButtonStyle } from "discord.js";

export const navMenu = {
    main: new ButtonBuilder({
        customId: "menu/settings/main",
        label: "Pagina principal",
        style: ButtonStyle.Danger
    }),
    back: (menu: string) => new ButtonBuilder({
        customId: `menu/settings/${menu}`,
        label: "Voltar",
        style: ButtonStyle.Danger,
    })
}