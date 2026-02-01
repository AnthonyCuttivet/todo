import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { todoService } from '../services/todoService';
import type { Todo, CreateTodoDto, UpdateTodoDto } from '../types';

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const sortedTodos = computed(() => {
    return [...todos.value].sort((a, b) => {
      if (a.checked !== b.checked) {
        return a.checked ? 1 : -1;
      }
      return a.id - b.id;
    });
  });

  async function fetchTodos() {
    loading.value = true;
    error.value = null;
    try {
      todos.value = await todoService.getAll();
    } catch (e) {
      error.value = 'Cannnot load #TODOs right now';
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

  return {
    todos,
    sortedTodos,
    loading,
    error,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo
  };
});
