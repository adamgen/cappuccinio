import { addLink, addStyle, client } from "../../utils.js";

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

export const getAnimation = async () => {
  const rev = (s) => s.split("").reverse().join("");
  const anim = await fetch(`/clients/${client}/t.json`).then((a) => a.json());

  anim.assets[1].layers[0].t.d.k[0].s.t = rev(
    anim.assets[1].layers[0].t.d.k[0].s.t,
  );
  anim.assets[2].layers[1].t.d.k[0].s.t = rev(
    anim.assets[2].layers[1].t.d.k[0].s.t,
  );

  // todo
  //  change name
  //  change letter
  //  change picture

  return anim;
};

export const getVideoUrl = () => {
  return `/clients/${client}/v.mp4`;
};
