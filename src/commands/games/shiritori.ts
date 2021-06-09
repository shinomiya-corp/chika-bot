import { PREFIX } from "../../constants";
import Shiritori from "../../games/shiritori";
import { checkAndBlock } from "../../games/utils/manageState";
import { lightErrorEmbed } from "../../shared/embeds";
import { Command } from "../../types/command";

const shiritori: Command = {
  name: "shiritori",
  argsCount: -1,
  category: "Game",
  description: "Play a round of Shiritori.",
  usage: `${PREFIX}shiritori [opponent]`,
  execute(message) {
    const taggedCount = message.mentions.users.size;
    if (taggedCount && taggedCount > 1) {
      message.channel.send(
        lightErrorEmbed(
          `**Shiritori** is a 2-player game!\nPlease tag only one other player.`
        )
      );
      return;
    }

    checkAndBlock(Shiritori, message).then(
      () => Shiritori.pregame(message),
      (err) => message.channel.send(lightErrorEmbed(err))
    );
  },
};

export default shiritori;