import { player } from "./mp4.js";
import { animItem } from "./animation.js";

const polling = () => {
  if (player.paused()) {
    animItem.goToAndStop(player.currentTime() * 1000);
  } else {
    animItem.goToAndPlay(player.currentTime() * 1000);
  }
  setTimeout(polling);
};

polling();
