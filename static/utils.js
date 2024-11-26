export const isDev = window.location.host.match(/0.0.0.0(:\d{4})/) !== null;

export const client = isDev
  ? "tlv-bday"
  : window.location.host.replace(".cappuccin.io", "");

export const getClientRun = () => import(`./clients/${client}/run.js`);
