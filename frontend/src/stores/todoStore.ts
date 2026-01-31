import { defineStore } from 'pinia';
import { ref } from 'vue';
import { todoService } from '../services/todoService';
import type { Todo, CreateTodoDto, UpdateTodoDto } from '../types';

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchTodos() {
    loading.value = true;
    error.value = null;
    try {
      todos.value = await todoService.getAll();
    } catch (e) {
      error.value = 'Erreur lors du chargement des todos';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  async function addTodo(dto: CreateTodoDto) {
    const newTodo = await todoService.create(dto);
    todos.value.push(newTodo);
  }

  async function updateTodo(id: number, dto: UpdateTodoDto) {
    const updated = await todoService.update(id, dto);
    const index = todos.value.findIndex(t => t.id === id);
    if (index !== -1) {
      todos.value[index] = updated;
    }
  }

  async function deleteTodo(id: number) {
    await todoService.delete(id);
    todos.value = todos.value.filter(t => t.id !== id);
  }

  return { todos, loading, error, fetchTodos, addTodo, updateTodo, deleteTodo };
});
