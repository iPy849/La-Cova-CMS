import {createRouter, createWebHistory} from 'vue-router';
import useAdminSessionStore from "../storage/adminStorage.js";

const routes = [
    {
        path: '/',
        component: () => (import('./../views/MainView.vue')),
        name: 'home',
    },
    {
        path: '/login',
        component: () => import('./../views/LoginView.vue'),
        name: 'login',
    },
    {
        path: '/admin',
        component: () => (import('./../views/admin/AdminLayoutView.vue')),
        name: 'admin',
        beforeEnter: (to) => {
            // No estás autenticado y No vas a autenticarte?
            if(!useAdminSessionStore().isLoggedIn && to.name !== 'login') {
                 return {name: 'login'};
            }
        },
        children: [
            {
                path: 'design-editor',
                component: () => import('../views/admin/DesignEditorView.vue'),
                name: 'design-editor'
            },
            {
                path: 'menu-editor',
                component: () => import('../views/admin/MenuEditorView.vue'),
                name: 'menu-editor'
            },
            {
                path: 'currency-editor',
                component: () => import('../views/admin/CurrencyEditorView.vue'),
                name: 'currency-editor'
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