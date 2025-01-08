import { Schema } from "mongoose";
import { t } from "../utils.js";

export const insigniaSchema = new Schema(
    {
        name: t.string,
        description: t.string,
        path: t.string
    }
);