import {defineStore} from "pinia";
import {computed, ref} from "vue";


const useAdminSessionStore = defineStore('counter', () => {
    // TODO: Hacer el login mediante jwt y poder controlar la expiración
    const userData = ref(null);
    
    const isLoggedIn = computed(() => userData.value !== null);
    
    const login = (userInfo) => (userData.value = userInfo);
    const logout = (userInfo) => (userData.value = null);
    
    return { userData, isLoggedIn, login, logout }
});


export default useAdminSessionStore;