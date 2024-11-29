import { getClientRun } from "./utils.js";

const run = await getClientRun();
const anim = await run.getAnimation();

const lottie = /** @type {import("lottie-web").default} */ (window.lottie);

// TODO adjust text https://lottiefiles.github.io/lottie-docs/text/#text-follow-path
// https://airbnb.io/lottie/#/web
// https://lottie.github.io/lottie-spec/1.0/specs/composition/#animationf
/** @type {import("lottie-web").AnimationItem} */
export const animItem = lottie.loadAnimation({
  container: document.getElementById("lottie"), // the dom element
  renderer: "svg",
  autoplay: false,
  loop: false,
  // controls: true,
  animationData: anim, // the animation data
  rendererSettings: {
    preserveAspectRatio: "xMinYMin slice", // Supports the same options as the svg element's preserveAspectRatio property
    progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
    hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
  },
});

window.animItem = animItem;

// animItem.goToAndStop(4000)
