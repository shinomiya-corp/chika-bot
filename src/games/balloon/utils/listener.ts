import type { Message } from "discord.js";
import { filterMessage } from "../../../utils/filterMessage";
import { postGameBalloon } from "./postGame";
import type { BalloonState } from "./types";

export const createBalloonListener = (state: BalloonState) => {
  const { players, channelId } = state;
  const listener = (message: Message) => {
    const { content, client } = message;
    if (
      !filterMessage(message, {
        authors: players.map((user) => user),
        channelId,
      })
    ) {
      client.once("message", listener);
      return;
    }

    // eslint-disable-next-line no-param-reassign
    state.currentVolume += content.length;
    if (state.currentVolume > state.tolerance) {
      postGameBalloon(message, players);
      return;
    }

    client.once("message", listener);
  };
  return listener;
};