const [_, type] = window.location.pathname.split("/");
if (type !== "b" && type !== "g") {
  console.error(`Bad type given "${type}"`);
  document.getElementById("error-box").classList.remove("hidden");
  document.getElementById("error-message").innerHTML = "404 עמוד לא נמצא";
}

const isDev = window.location.host.match(/0.0.0.0(:\d{4})/) !== null;
const client = isDev
  ? "tlv-bday"
  : window.location.host.replace(".cappuccin.io", "");

const mp4 = `/clients/${client}/${type}.mp4`;

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
