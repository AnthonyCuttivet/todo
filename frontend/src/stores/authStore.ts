import { defineStore } from 'pinia';
import { ref } from 'vue';
import { authService } from '../services/authService';
import type { LoginCredentials } from '../types';
import { toast } from 'vue3-toastify';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(authService.isAuthenticated());

  async function login(credentials: LoginCredentials) {
    try
    {
      const response = await authService.login(credentials);
      isAuthenticated.value = true;
      toast.success('Connecté');
    }
    catch(err)
    {
      toast.error('Identifiants incorrects');
    }

  }

  function logout() {
    authService.logout();
    isAuthenticated.value = false;
  }

  return { isAuthenticated, login, logout };
});
