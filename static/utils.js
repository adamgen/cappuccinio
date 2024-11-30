export const isDev = window.location.host.match(/0.0.0.0(:\d{4})/) !== null;

export const client = isDev
  ? "xtra"
  : window.location.host.replace(".cappuccin.io", "");

export const getClientRun = () => import(`./clients/${client}/run.js`);

/**
 * @param {Partial<HTMLLinkElement> & {hrel: string; rel: string;}} props
 */
export function addLink(props) {
  const lnk = document.createElement("link");
  Object.assign(lnk, props);
  document.getElementsByTagName("head")[0].appendChild(lnk);
}

/**
 * @param {Partial<HTMLStyleElement> & {cssText: string;}} props
 */
export function addStyle(props) {
  const style = document.createElement("style");
  Object.assign(style, props);
  style.appendChild(document.createTextNode(props.cssText));
  document.getElementsByTagName("head")[0].appendChild(style);
}

/**
 * @param {Partial<HTMLScriptElement> & {src: string; type?: string;}} props
 */
export function addScript(props) {
  const script = document.createElement("script");
  Object.assign(script, props);
  document.getElementsByTagName("head")[0].appendChild(script);
}
