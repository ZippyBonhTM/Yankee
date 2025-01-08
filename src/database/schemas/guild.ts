import { Schema } from "mongoose";
import { t } from "../utils.js";

export const guildSchema = new Schema(
    {
        id: t.string,
        channels: {
            logs: t.channelInfo,
            general: t.channelInfo
        },
        roles: {
            verify: t.roleInfo
        },
        breves: { type: [Schema.Types.ObjectId], ref: "breve", default: [] }       
    },
    {
        statics: {
            async get(id: string) {
                return await this.findOne({ id }) ?? this.create({ id });
            }
        }
    }
);