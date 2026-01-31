import { defineStore } from 'pinia';
import { ref } from 'vue';
import { authService } from '../services/authService';
import type { LoginCredentials } from '../types';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{ username: number; password: string } | null>(null);
  const isAuthenticated = ref(authService.isAuthenticated());

  async function login(credentials: LoginCredentials) {
    const response = await authService.login(credentials);
    isAuthenticated.value = true;
  }

  function logout() {
    authService.logout();
    user.value = null;
    isAuthenticated.value = false;
  }

  return { user, isAuthenticated, login, logout };
});
