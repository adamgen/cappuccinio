import { player } from "./mp4.js";
import { animItem } from "./animation.js";

const poll = () => {
  if (player.paused()) {
    animItem.goToAndStop(player.currentTime() * 1000);
  } else {
    animItem.goToAndPlay(player.currentTime() * 1000);
  }
};

const initPolling = async () => {
  while (true) {
    poll();
    await new Promise((resolve) => setTimeout(resolve));
  }
};

initPolling();
