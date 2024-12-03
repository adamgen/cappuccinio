import anim from "./t.js";
import { addLink, addStyle, getImageDimensions } from "../../utils.js";

addLink({
  href: "https://fonts.googleapis.com",
  rel: "preconnect",
});

addLink({
  href: "https://fonts.gstatic.com",
  rel: "preconnect",
  crossorigin: true,
});

addLink({
  href: "https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400..700;1,400..700&display=swap",
  rel: "stylesheet",
});

addStyle({
  cssText: `personalized-video { font-family: "Arimo", sans-serif; }`,
});

export const getAnimation = async (payload) => {
  const rev = (s) => s.split("").reverse().join("");

  console.assert(
    typeof payload.name === "string",
    `Expected payload.name to be string, got ${payload.name}`,
  );

  console.assert(
    typeof payload.companyName === "string",
    `Expected payload.companyName to be string, got ${payload.companyName}`,
  );

  console.assert(
    typeof payload.imageUrl === "string",
    `Expected payload.imageUrl to be string, got ${payload.imageUrl}`,
  );

  const imageSize = await getImageDimensions(payload.imageUrl);

  const fullWidth = 576;
  const ratio = fullWidth / imageSize.width;

  anim.assets[0].p = payload.imageUrl;
  anim.assets[0].w = fullWidth;
  anim.assets[0].h = imageSize.height * ratio;
  anim.assets[1].layers[0].t.d.k[0].s.t = rev(decodeURIComponent(payload.name));
  anim.assets[2].layers[1].t.d.k[0].s.t = rev(
    decodeURIComponent(payload.companyName),
  );

  return anim;
};

export const getVideoUrl = () => {
  return `https://customer-m17spzblvpq4qzi0.cloudflarestream.com/68ece500171636173395469b88486b7f/manifest/video.m3u8`;
};
