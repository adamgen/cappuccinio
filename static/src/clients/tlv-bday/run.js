import anim from "./t.js";

export const getAnimation = async (payload) => {
  anim.layers[1].t.d.k[0].s.t = payload.firstName;
  anim.layers[2].t.d.k[0].s.t = payload.lastName;
  delete anim.chars;

  return anim;
};

export const getVideoUrl = (payload) => {
  const [_, type] = window.location.pathname.split("/");

  if (payload.type === "g") {
    return "https://customer-m17spzblvpq4qzi0.cloudflarestream.com/844fe559a8fdeb54ece23a1f7962e77d/manifest/video.m3u8";
  } else if (payload.type === "b") {
    return "https://customer-m17spzblvpq4qzi0.cloudflarestream.com/e347f1748c56624dcbf3ff6c526e959a/manifest/video.m3u8";
  }
};
