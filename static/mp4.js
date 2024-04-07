const [_, type] = window.location.pathname.split("/");
if (type !== "b" && type !== "g") {
  console.error(`Bad type given "${type}"`);
  document.getElementById("error-box").classList.remove("hidden");
  document.getElementById("error-message").innerHTML = "404 עמוד לא נמצא";
}
const mp4 = `/clients/${type}.mp4`;

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
  },
);
window.player = player;

player.ready(() => {
  player.tech(false);
});

player.src(mp4);

$(() => {
  $(document).on("keydown", (e) => {
    if (e.keyCode === 32) {
      if (player.paused()) {
        player.play();
      } else {
        player.pause();
      }
    }
  });
});
