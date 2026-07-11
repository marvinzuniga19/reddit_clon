import { createRouter, createWebHistory } from 'vue-router'

const BASE_TITLE = 'Foro Vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: BASE_TITLE }
  },
  {
    path: '/r/:category',
    name: 'category',
    component: () => import('../views/HomeView.vue'),
    meta: { title: (route) => `r/${route.params.category} — ${BASE_TITLE}` }
  },
  {
    path: '/post/:id',
    name: 'post',
    component: () => import('../views/PostView.vue'),
    meta: { title: `Detalle — ${BASE_TITLE}` }
  },
  {
    path: '/crear',
    name: 'create',
    component: () => import('../views/CreatePostView.vue'),
    meta: { title: `Crear post — ${BASE_TITLE}` }
  },
  {
    path: '/editar/:id',
    name: 'edit',
    component: () => import('../views/EditPostView.vue'),
    meta: { title: `Editar post — ${BASE_TITLE}` }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: `404 — ${BASE_TITLE}` }
  }
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'function'
    ? to.meta.title(to)
    : to.meta.title
  document.title = title || BASE_TITLE
})

export default router
