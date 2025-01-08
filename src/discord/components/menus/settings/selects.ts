import { Responder, ResponderType } from "#base";
import { db } from "#database";
import { menus } from "#menus";
import { findChannel } from "@magicyan/discord";

new Responder({
    customId: "menu/settings/:menu/**:args",
    type: ResponderType.Select, cache: "cached",
    async run(interaction, { menu, args }) {
        const { values, guild } = interaction;

        await interaction.deferUpdate();
        
        const guildData = await db.guilds.get(guild.id);

        switch (menu) {
            case "channels": {
                const [channelName] = values;
                interaction.editReply(menus.settings.channels.submenu(guildData, channelName));
                return;
            };
            case "channel": {
                const [channelName] = args;
                const [channelId] = values;

                const { id, url } = findChannel(guild).byId(channelId)!;
                await guildData.$set(`channels.${channelName}`, { id, url }).save();
                interaction.editReply(menus.settings.channels.main(guildData, guild));
                return;
            };
        }
    },
});