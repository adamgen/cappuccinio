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

let isDebugMode = window.localStorage.getItem("is_debug_mode") === "true";

let bounce = false;
document.addEventListener("touchstart", function (e) {
  if (e.touches.length <= 1) {
    return;
  }
  if (!bounce) {
    bounce = true;
    setTimeout(() => {
      bounce = false;
    }, 300);
    return;
  }
  isDebugMode = !isDebugMode;
  setDebugModeUI();
  window.localStorage.setItem("is_debug_mode", isDebugMode + "");
});

const setDebugModeUI = () => {
  if (isDebugMode) {
    document.getElementById("debug-box").classList.remove("hidden");
  } else {
    document.getElementById("debug-box").classList.add("hidden");
  }
};
setDebugModeUI();
