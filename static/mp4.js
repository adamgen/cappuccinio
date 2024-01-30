// import { default as videojs } from "video.js";
const mp4 = "/clients/new.mp4";

const videojs = /** @type {import("video.js").default} */ (window.videojs);

/** @type {import("video.js").default} */
export const player = videojs("my-player", {
  fluid: true,
  controls: true,
  fullscreenToggle: false,
  autoplay: true,
});
window.player = player;

player.ready(() => {
  player.tech(false);
});

player.audioTracks().addEventListener("addtrack", function (e) {
  // if (e.track.label === paramName) {
  //   // TODO fix race
  //   setTimeout(() => {
  //     e.track.enabled = true;
  //   }, 100);
  // }
});

player.on('touchstart', function (e) {
  if (e.target.nodeName === 'VIDEO') {
    if (player.paused()) {
      this.play();
    } else {
      this.pause();
    }
  }
});



player.src(
  mp4,
  // "https://customer-m17spzblvpq4qzi0.cloudflarestream.com/2aff9945fd90b8ad3829a224ac5cd0b4/manifest/video.m3u8",
);

window.playInitiator = function(elem){
  player.play()
  elem.remove()
}
