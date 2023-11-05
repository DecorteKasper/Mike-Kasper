import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import '../src/styles/style.css'

import App from './App.vue'
import router from './router'

import useFirebase from './composables/useFirebase'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})


// Create Vue app
const app = createApp(App)
const { restoreUser } = useFirebase()

  ; (async () => {
    await restoreUser()

    app.use(router)
    app.use(vuetify)
    app.mount('#app')
  })()
