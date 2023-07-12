import {createRouter, createWebHistory} from 'vue-router';
import useAdminSessionStore from "../storage/adminStorage.js";

const routes = [
    {
        path: '/',
        component: () => (import('./../views/MainView.vue')),
        name: 'home',
    },
    {
        path: '/admin',
        component: () => (import('./../views/admin/AdminLayoutView.vue')),
        name: 'admin',
        beforeEnter: (to, from) => {
            // No estás autenticado
            if(!useAdminSessionStore().isLoggedIn) {
                // No vas a autenticarte?
                if (to.name !== 'login') {
                    return {path: '/admin/login'}
                }
            }
        },
        children: [
            {
                path: 'login',
                component: () => import('./../views/admin/LoginView.vue'),
                name: 'login',
            },
            {
                path: 'dashboard',
                component: () => import('./../views/admin/DashboardView.vue'),
                name: 'dashboard',
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => (import('./../views/NotFoundView.vue')),
        name: 'not-found',
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;