import {defineStore} from "pinia";
import {computed, ref} from "vue";


const useAdminSessionStore = defineStore('counter', () => {
    // TODO: Hacer el login mediante jwt y poder controlar la expiración
    const userData = ref(null);
    const setUserData = (userInfo) => (userData.value = userInfo);
    
    const isLoggedIn = computed(() => localStorage.getItem('cookieFallback') !== null);
    
    return { userData, setUserData, isLoggedIn }
});


export default useAdminSessionStore;