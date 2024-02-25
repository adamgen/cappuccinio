import { player } from "./mp4.js";
import { animItem } from "./animation.js";

// add when debugging animItem.goToAndStop(6 * 1000);
player.on("timeupdate", (e) => {
  if (e.manuallyTriggered) {
    if (player.paused()) {
      animItem.goToAndStop(player.currentTime() * 1000);
    } else {
      animItem.goToAndPlay(player.currentTime() * 1000);
    }
  } else if (player.scrubbing()) {
    player.scrubbing();
    animItem.goToAndStop(player.currentTime() * 1000);
  }
});
player.on("play", () => {
  animItem.goToAndPlay(player.currentTime() * 1000);
  // $("#container").get(0).requestFullscreen();
});
player.on("pause", () => {
  animItem.goToAndStop(player.currentTime() * 1000);
  // document.exitFullscreen();
});
