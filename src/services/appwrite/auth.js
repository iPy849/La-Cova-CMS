import { Account } from 'appwrite';
import client from './appwriteApp';
import useAdminSessionStore from '../../storage/adminStorage';
import { acceptHMRUpdate } from 'pinia';

const awAccount = new Account(client);

async function login(user, password) {
    try {
        const sessionData = await awAccount.createEmailSession(user, password);
        useAdminSessionStore().setUserData(sessionData);
        return true;
    } catch {
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