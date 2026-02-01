<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const error = ref('');

async function handleLogin() {
  error.value = '';
  try {
    await authStore.login({ username: username.value, password: password.value });
  } catch (e) {
    error.value = 'Wrong credientials';
  }
}
</script>

<template>
  <div class="login-container">
    <h2 class="text">Account</h2>
    <br/>
    <form @submit.prevent="handleLogin" class="login-form">
      <input
        v-model="username"
        placeholder="Username"
        required
        class="input"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        class="input"
      />
      <button type="submit" class="btn-primary">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background: #282828;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.text {
    color: #ffffff;
}

.input {
  padding: 12px;
  background-color: #3f3f3f;
  border: 1px solid #717171;
  border-radius: 4px;
  font-size: 16px;
  color: #ffffff;
}

.btn-primary {
  padding: 12px;
  background: #9760e6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover {
  background: #ac75f8;
}

.error {
  color: #f56565;
  font-size: 14px;
}
</style>
