import { Account, AppwriteException } from 'appwrite';
import client from './appwriteApp';
import useAdminSessionStore from '../../storage/adminStorage';

const awAccount = new Account(client);

async function login(user, password) {
    try {
        await awAccount.createEmailSession(user, password);
        return true;
    } catch (AppwriteException) {
        return false;
    }
    
}

async function retrieveUserInfo() {
    try {
       const sessionData = await awAccount.get()
       useAdminSessionStore().setUserData(sessionData);
       return true;
    } catch {
        return false;
    }
}

async function logout() {
    try {
        await awAccount.deleteSessions()
        useAdminSessionStore().setUserData(null);
        localStorage.removeItem('cookieFallback');
        return true;
     } catch {
         return false;
     }
}

export default {
    login,
    retrieveUserInfo,
    logout,
}