import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

addEventListener("fetch", (event) => {
  event.respondWith(handleEvent(event));
});

/**
 *
 * @param event {Event}
 * @returns {Promise<*>}
 */
async function handleEvent(event) {
  try {
    return await getAssetFromKV(event);
  } catch (e) {
    return await getAssetFromKV(event, {
      /**
       * @param req {Request}
       * @returns {Request}
       */
      mapRequestToAsset: (req) => {
        return new Request(`${new URL(req.url).origin}/index.html`, req);
      },
    });
  }
}
