import { Responder, ResponderType } from "#base";
import { db } from "#database";
import { menus } from "#menus";

new Responder({
    customId: "stsi/breve/:menu/:id",
    type: ResponderType.Button, cache: "cached",
    async run(interaction, { menu, id }) {
        await interaction.deferUpdate();

        switch (menu) {
            case "matricula": {
                interaction.editReply(menus.stsi.breve.matricula(id));
                return;
            }
        }
    },
});

new Responder({
    customId: "stsi/:menu",
    type: ResponderType.Button, cache: "cached",
    async run(interaction, { menu }) {
        await interaction.deferUpdate();

        const { guild } = interaction;
        const guildData = await (await db.guilds.get(interaction.guildId)).populate("breves");
        const brevesIds = guildData.breves;
        let breveData = [];

        for (let i = 0; i < brevesIds.length; i++) {
            const breve = await db.breve.findById(brevesIds[i]).exec();
            if (breve) breveData.push(breve);
        }
        
        switch (menu) {
            case "main": {
                interaction.editReply(menus.stsi.main(breveData, guild));
                return;
            }
        }
    },
});