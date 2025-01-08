import { Schema } from "mongoose";
import { t } from "../utils.js";

export const placeholderSchema = new Schema(
    {
        name: t.string,
        description: t.string,
        path: t.string,
        settings: {
            
        }
    },
);

export const backgroundSchema = new Schema(
    {
        name: t.string,
        description: t.string,
        path: t.string
    }
);