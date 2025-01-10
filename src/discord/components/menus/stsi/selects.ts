import { Responder, ResponderType } from "#base";
import { BreveSchema, db } from "#database";
import { menus } from "#menus";
import { findMember } from "@magicyan/discord";
import { BreveSchemaType } from "menus/stsi/main.js";
import { Types } from "mongoose";

export type alunoBreveType = Types.Subdocument<Types.ObjectId, any, {
    done: boolean;
    pontos: number;
    breve?: Types.ObjectId | null;
}> & {
    done: boolean;
    pontos: number;
    breve?: Types.ObjectId | null;
}

new Responder({
    customId: "stsi/breve/:select/:id",
    type: ResponderType.Select, cache: "cached",
    async run(interaction, { select, id }) {
        const { values, guild } = interaction;
        await interaction.deferUpdate();
        
        switch (select) {
            case "breve": {
                const breveData = await db.breve.findById(values).populate("alunos").exec();

                if (breveData) interaction.editReply(menus.stsi.breve.main(breveData));
                return;
            }
            case "user": {
                const [memberId] = values;
                const user = findMember(guild).byId(memberId)?.user;
                const member = await db.members.findOne({ id: memberId }).exec();
                const breveData = await db.breve.findById(id).exec();
                if (!user) return;
                if (!member) return;
                if (!breveData) return;

                let alunoBreve: alunoBreveType | null = null;

                member.breves.some(breve => {
                    if (breve?.breve?.toString() === id) {
                        alunoBreve = breve;
                        return true;
                    }
                    return false;
                });

                if (alunoBreve) {
                    interaction.editReply(menus.stsi.breve.aluno(breveData, alunoBreve, user));
                    return;
                } else {
                    return;
                };
            }
            case "matricula": {
                const [memberId] = values;
                const member = await db.members.findOne({ id: memberId });
                if (!member) return;

                const objectId = new Types.ObjectId(id);
                member.breves.push({ breve: objectId });
                await member.save();

                const guildData = await db.guilds.get(guild.id);
                const brevesData: Array<BreveSchema & BreveSchemaType> = [];
                for (let i = 0; i < guildData.breves.length; i++) {
                    let breve = await db.breve.findById(guildData.breves[i]).populate("alunos").exec();
                    if (breve) {
                        brevesData.push(breve);
                    };
                };

                interaction.editReply(menus.stsi.main(brevesData, guild));
            }
        }
    }
});