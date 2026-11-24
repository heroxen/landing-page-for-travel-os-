/*
  Configure before publishing:
  1) Add the public download URLs for each platform below.
  2) Create a form at https://formspree.io/ and paste its endpoint into formspreeEndpoint.
  Leave a platform URL empty until you have a real, tested app build.
*/
window.TRAVELOS_CONFIG = {
  downloads: {
    android: "", // e.g. https://your-domain.com/releases/travelos.apk
    ios: "",     // e.g. https://apps.apple.com/app/your-app/id...
    windows: "",
    mac: ""
  },
  formspreeEndpoint: "" // e.g. https://formspree.io/f/xxxxxxxx
};