const [_, type] = window.location.pathname.split("/");
if (type !== "b" && type !== "g") {
  console.error(`Bad type given "${type}"`);
}
const mp4 = `/clients/${type}.mp4`;

const videojs = /** @type {import("video.js").default} */ (window.videojs);

// TODO fix types
/** @type {import("video.js/dist/types/player").Player} */
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

    player.on("play", function () {
      $("#play-initiator").addClass("hidden");
    });
  },
);
window.player = player;

player.ready(() => {
  player.tech(false);
});

player.src(mp4);

$(() => {
  $("#my-player").on("tap click", function () {
    if (player.paused()) {
      player.play();
    } else {
      player.pause();
    }
  });

  $("#play-initiator").on("tap click", function () {
    player.play();
    $("#play-initiator").addClass("hidden");
  });

  $(document).on("keydown", (e) => {
    if (e.keyCode === 32) {
      if (player.paused()) {
        player.play();
      } else {
        player.pause();
      }
      $("#play-initiator").addClass("hidden");
    }
  });
});
