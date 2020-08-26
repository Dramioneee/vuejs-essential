import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './directives'
import './components'
import store from './store'
import VueSweetalert2 from './plugins/vue-sweetalert2'
import Message from './plugins/message'
import './filters'
import { mockArticles } from './mock/data'
import ls from './utils/localStorage'
import './mock'
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.use(VueSweetalert2)
Vue.use(Message)
Vue.config.productionTip = false

const AddMockData = (() => {
  const isAddMockData = true
  let userArticles = ls.getItem('articles')

  if (Array.isArray(userArticles)) {
    userArticles = userArticles.filter(article => parseInt(article.uid) === 1)
  } else {
    userArticles = []
  }

  if (isAddMockData) {
    store.commit('UPDATE_ARTICLES', [...userArticles, ...mockArticles(100)])
  } else {
    store.commit('UPDATE_ARTICLES', userArticles)
  }
})()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
