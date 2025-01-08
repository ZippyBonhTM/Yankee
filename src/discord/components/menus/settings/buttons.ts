import { Responder, ResponderType } from "#base";
import { db } from "#database";
import { menus } from "#menus";

new Responder({
    customId: "menu/settings/:menu",
    type: ResponderType.Button, cache: "cached",
    async run(interaction, { menu }) {
        const { guild } = interaction;

        if (menu === "main") {
            interaction.update(menus.settings.main(guild));
            return;
        }

        await interaction.deferUpdate();
        const guildData = await db.guilds.get(guild.id);

        switch (menu) {
            case "channels": {
                interaction.editReply(menus.settings.channels.main(guildData, guild));
                return;
            }
        }
    },
});