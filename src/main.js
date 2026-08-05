import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import './style.css'
import App from './App.vue'

import Home from '@components/Home.vue'
import BlogList from '@components/BlogList.vue'
import BlogPost from '@components/BlogPost.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/blog', name: 'BlogList', component: BlogList },
  { path: '/blog/:slug', name: 'BlogPost', component: BlogPost },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.path === '/') {
      return { top: 0 }
    }
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  },
})

const app = createApp(App)
const head = createHead()
app.use(router)
app.use(head)
app.mount('#app')
