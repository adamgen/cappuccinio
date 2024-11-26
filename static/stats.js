import { isDev } from "./utils";

if (window.LogRocket && !isDev) {
  window.LogRocket.init("cappuccinio/cappuccinio");

  const [_, type, firstName, lastName] = window.location.pathname.split("/");
  if (firstName && lastName) {
    window.LogRocket.identify(JSON.stringify([type, firstName, lastName]), {
      type,
      firstName,
      lastName,
    });
  }
}
