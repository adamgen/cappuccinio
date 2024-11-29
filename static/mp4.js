import { getClientRun } from "./utils.js";

const run = await getClientRun();
const mp4 = run.getVideoUrl();

const videojs = /** @type {import("video.js").default} */ (window.videojs);

/** @type {import("video.js/dist/types/player").Player} */
export const player = videojs(
  "my-player",
  {
    bigPlayButton: true,
    fluid: true,
    playsInline: true,
    autoplay: true,
    controls: true,
    fullscreenToggle: false,
    controlBar: {
      children: [
        // "playToggle",
        "durationDisplay",
        "progressControl",
        "remainingTimeDisplay",
      ],
    },
  },
  () => {
    player.on("fullscreenchange", function () {
      if (player.isFullscreen()) {
        player.exitFullscreen();
      }
    });
    player.on("touchend", function (e) {
      if (e.target.nodeName === "VIDEO") {
        if (player.paused()) {
          player.play();
        } else {
          player.pause();
        }
      }
    });
  },
);
window.player = player;

player.ready(() => {
  player.tech(false);
});

player.src(mp4);

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (player.paused()) {
      player.play();
    } else {
      player.pause();
    }
  }
});
