import { Schema } from "mongoose";
import { t } from "../utils.js";

export const breveSchema = new Schema(
    {
        name: t.string,
        guild: { type: Schema.Types.ObjectId },
        descripton: t.string,
        alunos: { type: [Schema.Types.ObjectId], ref: "member", default: [] },
        detalhes: {
            objetivos: { type: String, default: "N/A" },
            topicos: { type: [String], default: ["N/A"] }
        }
    }
)