<script setup lang="ts">
import { ref } from 'vue';
import type { Todo, UpdateTodoDto } from '../types';
import { useTodoStore } from '../stores/todoStore';

const props = defineProps<{ todo: Todo }>();
const todoStore = useTodoStore();

const isEditing = ref(false);

async function toggleCheck() {
  const dto:UpdateTodoDto = {title:props.todo.title, content:props.todo.content, priority:props.todo.priority, executionDate:props.todo.executionDate, checked:!props.todo.checked};
  await todoStore.updateTodo(props.todo.id, dto);
}

function startEdit() {
  todoStore.setEditingTodo(props.todo);
  window.scrollTo({top:0, behavior:'smooth'});
}

async function deleteTodo() {
  if (confirm('Etes vous sûr de vouloir supprimer ce #TODO ?')) {
    await todoStore.deleteTodo(props.todo.id);
  }
}
</script>

<template>
  <div class="todo-item" :class="{ completed: todo.checked, editing: todoStore.editingTodo?.id === todo.id }">
    <input
      type="checkbox"
      :checked="todo.checked"
      @change="toggleCheck"
      class="checkbox"
    />

    <div v-if="!isEditing" class="todo-content" @dblclick="startEdit">
      <span class="title">{{ todo.title }}</span>
      <span class="content">{{ todo.content }}</span>
      <span class="priority">{{ todo.priority }}</span>
      <span class="executionDate" v-if="todo.executionDate">{{ new Date(todo.executionDate).toLocaleDateString() }}</span>
      <span class="date">{{ new Date(todo.createdAt).toLocaleDateString() }}</span>
    </div>

    <div class="actions">
      <button v-if="!isEditing" @click="startEdit" class="btn-edit">✏️</button>
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

.todo-item.editing {
  border: 2px dashed #d6850a;
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
  border: 2px solid #b84242;
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
