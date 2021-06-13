import { queue } from "../../data/redisClient";
import { Command, CommandCategory } from "../../types/command";
import {
  sendAddedToQueue,
  sendMusicOnlyInGuild,
  sendNoVideo,
} from "./utils/embeds";
import { validateArgs } from "./utils/youtube";

const add = new Command({
  name: "add",
  category: CommandCategory.MUSIC,
  description: "Adds a track to the queue.",
  args: [{ name: "url_or_title", multi: true }],

  async execute(message, args) {
    const { channel, guild, author } = message;
    if (!guild) {
      sendMusicOnlyInGuild(channel);
      return;
    }
    const videoData = await validateArgs(args);
    if (!videoData) {
      sendNoVideo(channel, args.join(" "));
      return;
    }

    queue.rpush(guild.id, JSON.stringify(videoData));
    sendAddedToQueue(channel, { videoData, author });
  },
});

export default add;
