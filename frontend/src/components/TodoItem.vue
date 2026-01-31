<script setup lang="ts">
import { ref } from 'vue';
import type { Todo } from '../types';
import { useTodoStore } from '../stores/todoStore';

const props = defineProps<{ todo: Todo }>();
const todoStore = useTodoStore();

const isEditing = ref(false);
const editContent = ref(props.todo.content);

async function toggleCheck() {
  await todoStore.updateTodo(props.todo.id, {
    checked: !props.todo.checked,
  });
}

function startEdit() {
  isEditing.value = true;
  editContent.value = props.todo.content;
}

async function saveEdit() {
  if (editContent.value.trim()) {
    await todoStore.updateTodo(props.todo.id, {
      content: editContent.value,
    });
    isEditing.value = false;
  }
}

function cancelEdit() {
  isEditing.value = false;
  editContent.value = props.todo.content;
}

async function deleteTodo() {
  if (confirm('Are you SURE FOR SHORE you want to delete this TODO ?')) {
    await todoStore.deleteTodo(props.todo.id);
  }
}
</script>

<template>
  <div class="todo-item" :class="{ completed: todo.checked }">
    <input
      type="checkbox"
      :checked="todo.checked"
      @change="toggleCheck"
      class="checkbox"
    />

    <div v-if="!isEditing" class="todo-content" @dblclick="startEdit">
      <span class="content">{{ todo.content }}</span>
      <span class="date">{{ new Date(todo.createdAt).toLocaleDateString() }}</span>
    </div>

    <input
      v-else
      v-model="editContent"
      @keyup.enter="saveEdit"
      @keyup.esc="cancelEdit"
      class="edit-input"
      autofocus
    />

    <div class="actions">
      <button v-if="!isEditing" @click="startEdit" class="btn-edit">✏️</button>
      <button v-if="isEditing" @click="saveEdit" class="btn-save">✓</button>
      <button v-if="isEditing" @click="cancelEdit" class="btn-cancel">✗</button>
      <button @click="deleteTodo" class="btn-delete">🗑️</button>
    </div>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #282828;
  border: 1px solid #bd94f0;
  border-radius: 6px;
  transition: all 0.2s;
}

.todo-item:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-item.completed .content {
  text-decoration: line-through;
}

.checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: #bd94f0;
}

.todo-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  color: #d4b7f5;
}

.content {
  font-size: 16px;
}

.date {
  font-size: 12px;
  color: #717171;
}

.edit-input {
  flex: 1;
  padding: 8px;
  border: 2px solid #42b883;
  border-radius: 4px;
  font-size: 16px;
}

.actions {
  display: flex;
  gap: 8px;
}

.actions button {
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  transition: background 0.2s;
}

.actions button:hover {
  background: #93909633;
}
</style>
