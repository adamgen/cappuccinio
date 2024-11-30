export const getAnimation = async () => {
  const anim = await fetch(`/clients/tlv-bday/Text.json`).then((a) => a.json());

  const [_, type, firstName, lastName] = window.location.pathname.split("/");
  anim.layers[1].t.d.k[0].s.t = firstName ? decodeURIComponent(firstName) : "";
  anim.layers[2].t.d.k[0].s.t = lastName ? decodeURIComponent(lastName) : "";
  delete anim.chars;

  return anim;
};

export const getVideoUrl = () => {
  const [_, type] = window.location.pathname.split("/");

  return `/clients/tlv-bday/${type}.mp4`;
};
