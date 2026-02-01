<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTodoStore } from '../stores/todoStore';
import { useAuthStore } from '../stores/authStore';
import TodoItem from './TodoItem.vue';

const todoStore = useTodoStore();
const authStore = useAuthStore();

const newTodoContent = ref('');

onMounted(() => {
  todoStore.fetchTodos();
});

async function addTodo() {
  if (newTodoContent.value.trim()) {
    await todoStore.addTodo({
      content: newTodoContent.value,
      checked: false,
    });
    newTodoContent.value = '';
  }
}
</script>

<template>
  <div class="todo-container">
    <div class="header">
      <h1>My #TODOs</h1>
      <button @click="authStore.logout" class="btn-logout">Logout</button>
    </div>

    <form @submit.prevent="addTodo" class="add-todo">
      <input
        v-model="newTodoContent"
        placeholder="New #TODO..."
        class="input"
      />
      <button type="submit" class="btn-add">Add</button>
    </form>

    <div v-if="todoStore.loading" class="loading">Loading...</div>

    <div v-else-if="todoStore.error" class="error">
      {{ todoStore.error }}
    </div>

    <div v-else-if="todoStore.sortedTodos.length === 0" class="empty">
      No #TODO right now
    </div>

    <div v-else class="todo-list">
      <TodoItem
        v-for="todo in todoStore.sortedTodos"
        :key="todo.id"
        :todo="todo"
      />
    </div>
  </div>
</template>

<style scoped>
.todo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  color: #ffffff;
}

.btn-logout {
  padding: 8px 16px;
  background: #f56565;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.input {
  flex: 1;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
  background-color: #3f3f3f;
  border: 1px solid #b183ed;
  color: #ffffff;
}

.btn-add {
  padding: 12px 24px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.loading, .error, .empty {
  text-align: center;
  padding: 40px;
  color: #718096;
}
</style>
