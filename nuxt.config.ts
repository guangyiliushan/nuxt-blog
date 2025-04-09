// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/ui',
    // 'nuxt-auth-utils',
    // '@sidebase/nuxt-auth'
  ],

  css: ['~/assets/css/main.css'],

})