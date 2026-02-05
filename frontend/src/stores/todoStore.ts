import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { todoService } from '../services/todoService';
import type { Todo, CreateTodoDto, UpdateTodoDto } from '../types';
import { toast } from 'vue3-toastify';

export type SortOption = 'default' | 'priority' | 'executionDate';

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const editingTodo = ref<Todo | null>(null);
  const sortBy = ref<SortOption>('default');

  const priorityOrder = { high: 3, medium: 2, low: 1 };
  const compliments:string[] = ['BG !', 'Solide !', 'Bien joué !', 'Parfait !', 'Tié un tigre !', 'Félicitations !', 'Carré !', 'Franchement bravo !', 'Fantastique !', 'Splendide !', 'GG WP !', 'Nickel !', 'Pour l\'Alliance !'];

  const sortedTodos = computed(() => {
    const todosCopy = [...todos.value];

    if (sortBy.value === 'priority') {
      return todosCopy.sort((a, b) => {
        if (a.checked !== b.checked) return a.checked ? 1 : -1; // Unchecked first
        return priorityOrder[b.priority] - priorityOrder[a.priority]; // Then by desc priority
      });
    }

    if (sortBy.value === 'executionDate') {
      return todosCopy.sort((a, b) => {
        if (a.checked !== b.checked) return a.checked ? 1 : -1;

        if (!a.executionDate && !b.executionDate) return 0;
        if (!a.executionDate) return 1;
        if (!b.executionDate) return -1;

        return new Date(a.executionDate).getTime() - new Date(b.executionDate).getTime();
      });
    }

    return todosCopy.sort((a, b) => {
      if (a.checked !== b.checked) return a.checked ? 1 : -1;
      return a.id - b.id;
    });
  });

  function setSortBy(option: SortOption) {
    sortBy.value = option;
  }

  function setEditingTodo(todo: Todo | null) {
    editingTodo.value = todo;
  }

  async function fetchTodos() {
    loading.value = true;
    error.value = null;
    try {
      todos.value = await todoService.getAll();
    } catch (e) {
      error.value = 'Impossible de charger les #TODOs';
      toast.error('Impossible de charger les #TODOs');
      console.log(e);
    } finally {
      loading.value = false;
    }
  }

  async function addTodo(dto: CreateTodoDto) {
    try
    {
      const newTodo = await todoService.create(dto);
      todos.value.push(newTodo);
      toast.success('#TODO ajouté avec succès !');
    }
    catch(err)
    {
      toast.error("Erreur lors de l'ajout du #TODO");
      console.log(err);
    }
  }

  async function updateTodo(id: number, dto: UpdateTodoDto) {
    try
    {
      let show_toast:boolean = true;
      const updated = await todoService.update(id, dto);
      const index = todos.value.findIndex(t => t.id === id);

      if(!updated.checked && todos.value[index]?.checked)
      {
        show_toast = false;
      }

      if (index !== -1) {
        todos.value[index] = updated;
      }

      if(show_toast)
      {
        toast.success((updated.checked ? compliments[Math.floor(Math.random() * compliments.length)] : '#TODO modifié avec succès !'));
      }
    }
    catch(err)
    {
      toast.error("Erreur lors de la modification du #TODO");
      console.log(err);
    }

  }

  async function deleteTodo(id: number) {
    try
    {
      await todoService.delete(id);
      todos.value = todos.value.filter(t => t.id !== id);
      toast.success('#TODO supprimé avec succès !');
    }
    catch(err)
    {
      toast.success('Erreur lors de la suppression du #TODO!');
      console.log(err);
    }
  }

  return {
    todos,
    sortedTodos,
    sortBy,
    loading,
    error,
    editingTodo,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    setEditingTodo,
    setSortBy,
  };
});
