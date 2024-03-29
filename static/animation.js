const anim = await fetch("/clients/Text.json").then((a) => a.json());

const lottie = /** @type {import("lottie-web").default} */ (window.lottie);

// TODO adjust text https://lottiefiles.github.io/lottie-docs/text/#text-follow-path

// const params = new URLSearchParams(window.location.search);
// const firstName = params.get("f") ?? "";
// const lastName = params.get("l") ?? "";

const [_, type, firstName, lastName] = window.location.pathname.split("/");

anim.layers[1].t.d.k[0].s.t = decodeURIComponent(firstName);
anim.layers[2].t.d.k[0].s.t = decodeURIComponent(lastName);

delete anim.chars;

// https://airbnb.io/lottie/#/web

/** @type {import("lottie-web").AnimationItem} */
export const animItem = lottie.loadAnimation({
  container: document.getElementById("lottie"), // the dom element
  renderer: "svg",
  autoplay: false,
  animationData: anim, // the animation data
  rendererSettings: {
    preserveAspectRatio: "xMinYMin slice", // Supports the same options as the svg element's preserveAspectRatio property
    title: "Accessible Title", // Adds SVG title element for accessible animation title
    description: "Accessible description.", // Adds SVG desc element for accessible long description of animation
    progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
    hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
    className: "some-css-class-name",
  },
});

window.animItem = animItem;

// animItem.goToAndStop(4000)
