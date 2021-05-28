import { PREFIX } from "../../constants";
import { lightErrorEmbed, withAuthorEmbed } from "../../shared/embeds";
import { Command } from "../../types/command";
import { sendNotInGuild, trackLinkAndDuration } from "./utils/embeds";

const resume: Command = {
  name: "resume",
  argsCount: 0,
  category: "Music",
  description: "Resume playback.",
  usage: `${PREFIX}resume`,
  async execute(message) {
    const { client, channel, guild, author } = message;
    if (!guild) {
      sendNotInGuild(channel);
      return;
    }

    const queue = client.audioQueues.get(guild.id);

    if (!queue?.dispatcher?.paused) {
      channel.send(lightErrorEmbed("There is nothing to resume..."));
      return;
    }

    queue.dispatcher.resume();
    const { title, url, duration } = queue.nowPlaying!;
    channel.send(
      withAuthorEmbed(author)
        .setTitle(`:arrow_forward: Resumed`)
        .setDescription(trackLinkAndDuration({ title, url, duration }))
    );
  },
};

export default resume;