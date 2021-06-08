import type { Message } from "discord.js";
import { lightErrorEmbed } from "../shared/embeds";
import type { Command } from "../types/command";
import { secToWordString } from "./time";

export const isOnCooldown = async (
  message: Message,
  command: Command
): Promise<boolean> => {
  const { channel, author, client } = message;
  if (command.channelCooldown) {
    const ttl = await client.cooldownManager.getCooldown(
      channel.id,
      command.name
    );
    if (ttl) {
      channel.send(
        lightErrorEmbed(
          `Please wait ${secToWordString(ttl)} before using **${
            command.name
          }** in this channel again.`
        )
      );
      return true;
    }
  }
  if (command.userCooldown) {
    const ttl = await client.cooldownManager.getCooldown(
      author.id,
      command.name
    );
    if (ttl) {
      message.channel.send(
        lightErrorEmbed(
          `**${author.username}**, please wait ${secToWordString(
            ttl
          )} before using **${command.name}** again.`
        )
      );
      return true;
    }
  }
  return false;
};
