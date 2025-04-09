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
    '@sidebase/nuxt-auth'
  ],

  css: ['~/assets/css/main.css'],

  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    // originEnvKey: 'AUTH_ORIGIN',
    originEnvKey: 'NUXT_BASE_URL',
    baseURL: 'http://localhost:3000/api/auth',
    provider: {
      type: 'local',
      session: {
        dataType: {
          user : {
            id: 'number',
            username: 'string',
            email: 'string',
          }
        },
      },
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'post' },
        signUp: { path: '/register', method: 'post' },
        getSession: { path: '/session', method: 'get' },
      },
    },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    }
  }
})