// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {enabled: true},
  css: ['~/assets/styles/scss/main.scss'],
  runtimeConfig: {
    public: {
      recaptcha: {
        /* reCAPTCHA options */
        siteKey: process.env.RECAPTCHA_SITE_KEY // for example
      }
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@prisma/nuxt',
    '@vee-validate/nuxt',
    '@nuxtjs/google-fonts',
    'shadcn-nuxt',
    'nuxt-snackbar'
  ],
  build: {
    transpile: ['@fortawesome/vue-fontawesome']
  },
  tailwindcss: {
    cssPath: '~/assets/images/css/tailwind.css',
    configPath: 'tailwind.config',
  },
  googleFonts: {
    families: {
      Poppins: {
        wght: [300, 400, 500, 600, 700, 800],
        ital: [300, 400, 500, 600, 700, 800],
      }
    }
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  snackbar: {
    bottom: true,
    right: true,
    duration: 3000
  }
})