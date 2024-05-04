import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import "@/assets/styles/vuetify.scss"

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        ssr: true,
        theme: {
            defaultTheme: 'dark'
          }
    })

    app.vueApp.use(vuetify)
})