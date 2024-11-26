import { client } from "../../utils.js";

export const getAnimation = async () => {
  const anim = await fetch(`/clients/${client}/Text.json`).then((a) =>
    a.json(),
  );

  const [_, type, firstName, lastName] = window.location.pathname.split("/");
  anim.layers[1].t.d.k[0].s.t = firstName ? decodeURIComponent(firstName) : "";
  anim.layers[2].t.d.k[0].s.t = lastName ? decodeURIComponent(lastName) : "";
  delete anim.chars;

  return anim;
};

export const getVideoUrl = () => {
  const [_, type] = window.location.pathname.split("/");
  if (type !== "b" && type !== "g") {
    console.error(`Bad type given "${type}"`);
    document.getElementById("error-box").classList.remove("hidden");
    document.getElementById("error-message").innerHTML = "404 עמוד לא נמצא";
  }

  return `/clients/${client}/${type}.mp4`;
};
