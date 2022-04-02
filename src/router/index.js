import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

// pour les chemins d'accès
// affiche un composant, selon le chemin d'accès
const routes = [
    {
        path: '/',
        name: 'Nav',
        component: () => import('../views/Home.vue'),
        children:[
            {
                path: '/',
                name: 'Carousel',
                component: () => import('../components/carousel.vue'),
            },
            {
                path: '/animal/:id',
                name: 'Animal',
                component: () => import('../views/Animal.vue'),
                props: route =>({id:route.params.id}),
            }
        ]
        // meta: {
        //     requiresAuth: true
        // },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),

    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes // short for `routes: routes`
})

// vérifie avant chaque chemin si l'utilisateur est connécté (si non est envoyé a la page de login)
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    if (requiresAuth && !store.getters.getUtilisateur) {
        next('/login')
    } else {
        next()
    }
})

export default router
