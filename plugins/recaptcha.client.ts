import { install } from "vue3-recaptcha-v2";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(install, {
    sitekey: useRuntimeConfig()?.public?.recaptcha?.siteKey,
    cnDomains: false,
  });
});