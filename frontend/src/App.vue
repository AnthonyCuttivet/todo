<script setup lang="ts">
import { useAuthStore } from './stores/authStore';
import LoginForm from './components/LoginForm.vue';
import TodoList from './components/TodoList.vue';


const authStore = useAuthStore();
</script>

<template>
  <div id="app">
    <LoginForm v-if="!authStore.isAuthenticated" />
    <TodoList v-else />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: #121212;
}

#app {
  min-height: 100vh;
  padding: 20px;
}
</style>
