import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import '@/assets/styles/vuetify.scss'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        ssr: true,
        theme: {
            defaultTheme: 'dark'
        },
        defaults: {
            VTextField: {
                variant: 'underlined',
                color: 'purple-darken-2',
            },
            VTextarea: {
                variant: 'underlined',
                color: 'purple-darken-2',
            },
            VCardTitle: {
                style: 'white-space: initial;',
            }
        }
    })

    app.vueApp.use(vuetify)
})