import { MessageEmbed } from "discord.js";
import { chika_pink, PREFIX } from "../constants";
import { chika_crying_png } from "../assets";

export const genBadCommandEmbed = (...badCommands: string[]) =>
  new MessageEmbed()
    .setColor(chika_pink)
    .setThumbnail(chika_crying_png)
    .setDescription(
      `I couldn't understand these commands: ${badCommands
        .map((cmd) => `**${cmd}**`)
        .join(", ")}.`
    )
    .addField(
      "\u200b",
      `Run \`${PREFIX}help\` to get a list of all the commands I know.`
    );
