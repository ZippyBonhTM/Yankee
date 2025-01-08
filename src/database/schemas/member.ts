import { Schema } from "mongoose";
import { t } from "../utils.js";

export const memberSchema = new Schema(
    {
        id: t.string,
        guildId: t.string,
        codename: t.string,
        bloodType: t.string,
        reputacao: {
            fo: { type: Number, default: 0 }
        },
        breves: {
            type: [{
                breve: { type: Schema.Types.ObjectId, ref: "breves" },
                pontos: { type: Number, default: 0 },
                done: { type: Boolean, default: false },
            }],
            default: [],
        },
        activeTheme: {
            background: { type: Schema.Types.ObjectId, ref: "background", default: null },
            placeholder: { type: Schema.Types.ObjectId, ref: "placeholder", default: null }
        }
    },
);