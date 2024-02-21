const [_, type] = window.location.pathname.split("/");
if (type !== "b" && type !== "g") {
  console.error(`Bad type given "${type}"`);
}
const mp4 = `/clients/${type}.mp4`;

const videojs = /** @type {import("video.js").default} */ (window.videojs);

/** @type {import("video.js").default} */
export const player = videojs(
  "my-player",
  {
    fluid: true,
    fullscreenToggle: false,
    playsInline: true,
    autoplay: true,
    controls: true,
    controlBar: {
      pictureInPictureToggle: false,
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
  $("#my-player").on("tap", function () {
    if (player.paused()) {
      player.play();
    } else {
      player.pause();
    }
  });

  $("#play-initiator").on("tap", function () {
    player.play();
    $(this).toggleClass("hidden");
  });
});
