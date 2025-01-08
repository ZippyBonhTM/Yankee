import mongoose, { InferSchemaType, model } from "mongoose";
import { guildSchema } from "./schemas/guild.js";
import { memberSchema } from "./schemas/member.js";
import { log } from "#settings";
import chalk from "chalk";
import { backgroundSchema, placeholderSchema } from "./schemas/theme_schemas.js";
import { insigniaSchema } from "./schemas/insignias.js";
import { breveSchema } from "./schemas/breves.js";

try {
   await mongoose.connect(process.env.MONGO_URI);
   log.success(chalk.green("MongoDB connected"));
} catch(err){
   log.error(err);
   process.exit(1);
}

export const db = {
   breve: model("breve", breveSchema, "breves"),
   guilds: model("guild", guildSchema, "guilds"),
   members: model("member", memberSchema, "members"),
   insignia: model("insignia", insigniaSchema, "insignias"),
   background: model("background", backgroundSchema, "backgrounds"),
   placeholder: model("placeholder", placeholderSchema, "placeholders")
};

export type BreveSchema = InferSchemaType<typeof breveSchema>;
export type GuildSchema = InferSchemaType<typeof guildSchema>;
export type MemberSchema = InferSchemaType<typeof memberSchema>;
export type InsigniaSchema = InferSchemaType<typeof insigniaSchema>;
export type BackgorundSchema = InferSchemaType<typeof backgroundSchema>;
export type PlaceholderSchema = InferSchemaType<typeof placeholderSchema>;